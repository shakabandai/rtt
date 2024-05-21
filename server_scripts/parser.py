def parse_commands(audit_data):
    commands = []
    entries = audit_data.split('----')

    for entry in entries:
        if not entry.strip():
            continue  # Skip empty records
        
        record_dict = {}
        command_line = []
        
        for line in entry.strip().split('\n'):
            if 'type=SYSCALL' in line:
                record_dict['username'] = re.search(r'uid=(\w+)', line).group(1) if re.search(r'uid=(\w+)', line) else 'Unknown'
                record_dict['timestamp'] = re.search(r'time=(.*?) ', line).group(1) if re.search(r'time=(.*?) ', line) else None
            elif 'type=EXECVE' in line:
                args = re.findall(r'\ba\d+="(.*?)"', line)
                command_line = [arg.strip('"') for arg in args]
        
        if 'username' in record_dict and 'timestamp' in record_dict and command_line:
            formatted_timestamp = datetime.datetime.strptime(record_dict['timestamp'], "%a %b %d %H:%M:%S %Y").isoformat()
            commands.append({
                "username": record_dict['username'],
                "timestamp": formatted_timestamp,
                "command": ' '.join(command_line)
            })

    return commands