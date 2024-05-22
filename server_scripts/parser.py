import datetime
import re

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
                if 'type=EXECVE' in line:
                    # Extract timestamp from the line
                    timestamp_match = re.search(r'msg=audit\((\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}:\d{3}:\d{6})\)', line)
                    if timestamp_match:
                        timestamp_str = timestamp_match.group(1)
                        try:
                            # Parse timestamp assuming a specific format
                            # Adjusting format to match the structure: 05/21/2024 22:41:36:454:385315
                            # Convert to a format datetime can handle: 05/21/2024 22:41:36.454385
                            timestamp_str = timestamp_str.replace(':', ' ', 2).replace(':', '.', 1).replace(':', '')
                            timestamp = datetime.datetime.strptime(timestamp_str, "%m/%d/%Y %H:%M:%S.%f").isoformat()
                        except ValueError:
                            print(f"Error parsing timestamp: {timestamp_str}")

                    # Extract all arguments a0, a1, ..., an
                    args = re.findall(r'\ba\d+="([^"]*)"', line)
                    command_line = args  # Use all arguments including the command itself (a0)

            if timestamp and command_line:
                all_commands.append({
                    "username": user_id,
                    "timestamp": timestamp,
                    "command": ' '.join(command_line)
                })

    return all_commands
