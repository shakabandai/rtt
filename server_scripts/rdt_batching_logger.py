import argparse
import subprocess
import time
import requests
import datetime

API_ENDPOINT = "http://example.com/api/command"
POLL_INTERVAL = 2  # Interval in seconds to fetch new logs

def fetch_audit_logs(last_timestamp, user_ids):
    # Format ausearch command to fetch logs since last timestamp for given users
    users_filter = " || ".join(f"uid={uid}" for uid in user_ids)
    command = f"sudo ausearch -ts '{last_timestamp.strftime('%Y/%m/%d %H:%M:%S')}' -i -m EXECVE | grep -E '({users_filter})'"
    result = subprocess.run(command, shell=True, text=True, capture_output=True)
    return result.stdout

def parse_commands(audit_data):
    # Dummy parser function, needs real implementation
    commands = []
    for line in audit_data.split('\n'):
        if 'type=EXECVE' in line:
            timestamp = datetime.datetime.now().isoformat()
            command = line  # Simplify, you should parse this properly
            commands.append({"timestamp": timestamp, "command": command})
    return commands

def send_commands_to_api(commands, session_id):
    if commands:
        response = requests.post(API_ENDPOINT, json={"commands": commands, "session_id": session_id})
        print("Batch of commands sent to API:", response.status_code)

def monitor_commands(user_ids, duration, session_id):
    start_time = datetime.datetime.now()
    last_check = start_time
    end_time = start_time + datetime.timedelta(seconds=duration)

    while datetime.datetime.now() < end_time:
        current_time = datetime.datetime.now()
        if (current_time - last_check).seconds >= POLL_INTERVAL:
            audit_logs = fetch_audit_logs(last_check, user_ids)
            commands = parse_commands(audit_logs)
            send_commands_to_api(commands, session_id)
            last_check = current_time
        time.sleep(POLL_INTERVAL - ((time.time() - start_time.timestamp()) % POLL_INTERVAL))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Monitor and batch send executed commands to an API or log them locally based on mode.')
    parser.add_argument('session_id', type=str, help='Session ID for the API')
    parser.add_argument('user_ids', type=str, help='Comma-separated list of user IDs to monitor')
    parser.add_argument('duration', type=int, help='Duration to monitor in seconds')
    args = parser.parse_args()

    user_ids = [int(uid.strip()) for uid in args.user_ids.split(',')]
    monitor_commands(user_ids, args.duration, args.session_id)
