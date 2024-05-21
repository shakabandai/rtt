import subprocess
import re

def parse_ausearch_output(usernames):
    results = []
    for username in usernames:
        # Run ausearch for each username and capture its output
        command = ['ausearch', '-ui', username, '-i']  # -i for interpreting numeric IDs
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Decode results to string
        output = result.stdout.decode('utf-8')
        error_output = result.stderr.decode('utf-8')

        # Check if there is an error message indicating non-numeric or unknown user ID
        if "unknown" in error_output.lower():
            print(f"Warning: User ID for '{username}' is non-numeric and unknown.")
            continue

        # Process each record
        records = output.split('----')
        for record in records:
            if not record.strip():
                continue  # skip empty records
            record_dict = {}
            command_line = []
            for line in record.strip().split('\n'):
                if 'type=SYSCALL' in line:
                    user_match = re.search(r'uid=(\w+)', line)
                    if user_match:
                        record_dict['username'] = user_match.group(1)
                    time_match = re.search(r'time=(.*?) ', line)
                    if time_match:
                        record_dict['timestamp'] = time_match.group(1)
                if 'type=EXECVE' in line:
                    cmd_match = re.search(r'argc=\d+ (.*)', line)
                    if cmd_match:
                        cmd_parts = cmd_match.group(1).strip().split(' ')
                        command_line = [re.sub(r'a\d+="', '', part).strip('"') for part in cmd_parts]
            if 'username' in record_dict and command_line:
                record_dict['command'] = ' '.join(command_line)
                results.append(record_dict)

    return results

# Usage example
usernames = ['username1', 'username2', 'nonexistent']
parsed_output = parse_ausearch_output(usernames)
for item in parsed_output:
    print(item)
