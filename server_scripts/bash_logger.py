import sys
import time
import json
from datetime import datetime
import subprocess
import socketio

# Global WebSocket URL
WEBSOCKET_URL = 'http://your.websocket.server'

sio = socketio.Client()

def setup_logging(session_id):
    """Set up the logging environment."""
    log_path = f"/var/log/{session_id}.log"
    with open('/etc/profile.d/command_logger.sh', 'w') as f:
        f.write(
            f"""#!/bin/bash
log_command() {{
    echo "$(date "+%Y-%m-%d %H:%M:%S") - $USER - $(history 1 | sed 's/^[ ]*[0-9]*[ ]*//')" >> {log_path}
}}
PROMPT_COMMAND="log_command"
""")
    subprocess.run(['chmod', '+x', '/etc/profile.d/command_logger.sh'])
    return log_path

def remove_logging():
    """Remove logging script."""
    subprocess.run(['rm', '/etc/profile.d/command_logger.sh'])

def connect_to_websocket():
    """Connect to a WebSocket server."""
    sio.connect(WEBSOCKET_URL)
    print("Connected to WebSocket.")

def send_log_updates(log_path, duration):
    """Send log updates to the WebSocket every two seconds, formatted as JSON."""
    start_time = time.time()
    last_size = 0
    while time.time() - start_time < duration:
        with open(log_path, 'r') as file:
            file.seek(last_size)
            lines = file.readlines()
            last_size = file.tell()
            entries = []
            for line in lines:
                try:
                    timestamp, user, command = line.strip().split(" - ", 2)
                    entry = {
                        "timestamp": timestamp,
                        "user": user,
                        "command": command
                    }
                    entries.append(entry)
                except ValueError:
                    # Handles lines that don't properly split into three parts
                    continue
            if entries:
                sio.emit('log_update', json.dumps(entries))  # Send a list of JSON objects
        time.sleep(2)


def convert_to_csv(log_path, output_csv):
    """Convert log file to CSV format."""
    with open(log_path, 'r') as log_file, open(output_csv, 'w') as csv_file:
        csv_file.write("Timestamp,User,Command\n")
        for line in log_file:
            timestamp, user, command = line.split(" - ", 2)
            csv_file.write(f"{timestamp},{user},{command.replace(',', ';')}\n")

def main(duration, session_id):
    log_path = setup_logging(session_id)
    connect_to_websocket()
    try:
        send_log_updates(log_path, duration)
    finally:
        remove_logging()
        convert_to_csv(log_path, f"{session_id}.csv")
        print(f"Log saved to {session_id}.csv")
        sio.disconnect()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python log_commands.py <duration_in_seconds> <session_id>")
        sys.exit(1)
    duration = int(sys.argv[1])
    session_id = sys.argv[2]
    main(duration, session_id)
