import argparse
import subprocess
import time
import datetime
import asyncio
import websockets
import json

WEBSOCKET_URL = "ws://example.com/websocket"
POLL_INTERVAL = 2  # Interval in seconds to fetch new logs

async def fetch_audit_logs(last_timestamp, user_ids):
    command = f"sudo ausearch -ts '{last_timestamp.strftime('%Y/%m/%d %H:%M:%S')}' -ui '{','.join(user_ids)}' -i -m EXECVE"
    process = subprocess.Popen(command, shell=True, universal_newlines=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if stderr:
        print(f"Error fetching audit logs: {stderr}")
    return stdout

def parse_commands(audit_data):
    commands = []
    for line in audit_data.split('\n'):
        if 'type=EXECVE' in line:
            timestamp = datetime.datetime.now().isoformat()
            command = line  # This needs proper parsing based on actual format
            commands.append({"timestamp": timestamp, "command": command})
    return commands

async def send_commands_to_websocket(commands, session_id):
    async with websockets.connect(WEBSOCKET_URL) as websocket:
        if commands:
            message = json.dumps({"session_id": session_id, "commands": commands})
            await websocket.send(message)
            print("Batch of commands sent to WebSocket.")

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
        await asyncio.sleep(POLL_INTERVAL - ((time.time() - start_time.timestamp()) % POLL_INTERVAL))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Monitor and send executed commands via WebSocket.')
    parser.add_argument('session_id', type=str, help='Session ID for WebSocket communication')
    parser.add_argument('user_ids', type=str, help='Comma-separated list of user identifiers to monitor')
    parser.add_argument('duration', type=int, help='Duration to monitor in seconds')
    args = parser.parse_args()

    user_ids = args.user_ids.split(',')
    asyncio.run(monitor_commands(user_ids, args.duration, args.session_id))