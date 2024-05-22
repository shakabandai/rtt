import argparse
import subprocess
import datetime
import asyncio
import websockets
import json
import re

WEBSOCKET_URL = "ws://localhost:3000/app/session_logs/webhook"
POLL_INTERVAL = 2  # Interval in seconds to fetch new logs

async def fetch_audit_logs(last_timestamp, user_ids):
    results = {}
    if not user_ids:
        print("No user IDs provided.")
        return results

    for user_id in user_ids:
        command = f"sudo ausearch -ts '{last_timestamp.strftime('%Y/%m/%d %H:%M:%S')}' -ui '{user_id}' -i -m EXECVE | grep 'type=EXECVE'"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        stdout, stderr = process.communicate()

        if stderr:
            print(f"Error fetching audit logs for {user_id}: {stderr}")
        else:
            results[user_id] = stdout

    return results

def parse_commands(audit_data_dict):
    all_commands = []
    for user_id, audit_data in audit_data_dict.items():
        entries = audit_data.split('----')
        for entry in entries:
            if not entry.strip():
                continue  # Skip empty records

            command_line = []
            timestamp = None

            for line in entry.strip().split('\n'):
                args = re.findall(r'\ba\d+="(.*?)"', line)
                command_line = [arg.strip('"') for arg in args]
                timestamp_match = re.search(r'time=(.*?) ', line)
                if timestamp_match:
                    timestamp = timestamp_match.group(1)

            if timestamp and command_line:
                try:
                    formatted_timestamp = datetime.datetime.strptime(timestamp, "%a %b %d %H:%M:%S %Y").isoformat()
                    all_commands.append({
                        "username": user_id,
                        "timestamp": formatted_timestamp,
                        "command": ' '.join(command_line)
                    })
                except ValueError:
                    print(f"Error formatting date: {timestamp}")

    return all_commands

async def send_commands_to_websocket(logs, session_id):
    async with websockets.connect(WEBSOCKET_URL) as websocket:
        if logs:
            message = json.dumps({"session_id": session_id, "logs": logs})
            await websocket.send(message)
            response = await websocket.recv()
            print("Response from WebSocket:", response)

async def monitor_commands(user_ids, duration, session_id):
    start_time = datetime.datetime.now()
    last_check = start_time
    end_time = start_time + datetime.timedelta(seconds=duration)

    while datetime.datetime.now() < end_time:
        current_time = datetime.datetime.now()
        if (current_time - last_check).seconds >= POLL_INTERVAL:
            audit_logs = await fetch_audit_logs(last_check, user_ids)
            commands = parse_commands(audit_logs)
            await send_commands_to_websocket(commands, session_id)
            last_check = current_time
        await asyncio.sleep(POLL_INTERVAL - ((datetime.datetime.now().timestamp() - start_time.timestamp()) % POLL_INTERVAL))

def main():
    parser = argparse.ArgumentParser(description='Monitor and send executed commands via WebSocket.')
    parser.add_argument('session_id', type=str, help='Session ID for WebSocket communication')
    parser.add_argument('user_ids', type=str, help='Comma-separated list of user identifiers to monitor')
    parser.add_argument('duration', type=int, help='Duration to monitor in seconds')
    args = parser.parse_args()

    user_ids = args.user_ids.split(',')

    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(monitor_commands(user_ids, args.duration, args.session_id))
    finally:
        loop.close()

if __name__ == "__main__":
    main()
