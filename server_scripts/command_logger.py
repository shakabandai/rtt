import argparse
import subprocess
import time
import requests
import os

API_ENDPOINT = "http://example.com/api/command"

def setup_auditd(user_ids, test_mode):
    rules = []
    if test_mode:
        user_ids = [os.getuid()]  # Current user's UID for test mode
    for user_id in user_ids:
        # Set auditd rule to log all bash commands for each specified user
        bash_rule = ["-a", "always,exit", "-F", "arch=b64", "-F", "euid={}".format(user_id), "-S", "execve"]
        subprocess.run(["auditctl"] + bash_rule)
        rules.append(bash_rule)

        # Set auditd rule to log file accesses related to Vim for each specified user
        vim_rule = ["-w", "/usr/bin/vim.basic", "-p", "x", "-k", "vim_commands_{}".format(user_id)]
        subprocess.run(["auditctl"] + vim_rule)
        rules.append(vim_rule)
    
    return rules

def disable_auditd(rules):
    # Disable all auditd rules set up for this session
    for rule in rules:
        subprocess.run(["auditctl", "-d"] + rule[1:])

def send_command_to_api(command, session_id, test_mode):
    if test_mode:
        print(f"Test Mode: Command logged: {command}")
    else:
        # Send command along with the session ID to API endpoint
        try:
            response = requests.post(API_ENDPOINT, json={"command": command, "session_id": session_id})
            if response.status_code == 200:
                print(f"Command sent to API successfully: {command}")
            else:
                print(f"Failed to send command to API: {response.status_code}")
        except Exception as e:
            print(f"Error sending command to API: {str(e)}")

def monitor_auditd_logs(duration, rules, session_id, test_mode):
    # Monitor auditd logs for specified duration
    start_time = time.time()
    end_time = start_time + duration
    with subprocess.Popen(["tail", "-f", "/var/log/audit/audit.log"], stdout=subprocess.PIPE) as process:
        while time.time() < end_time:
            line = process.stdout.readline()
            if line:
                command = line.decode().strip()  # Extract the command from the audit log
                send_command_to_api(command, session_id, test_mode)
    disable_auditd(rules)

def parse_arguments():
    parser = argparse.ArgumentParser(description='Monitor specific user commands and send them to an API or log them locally based on mode.')
    parser.add_argument('session_id', type=str, help='Session ID for the API')
    parser.add_argument('user_ids', type=str, help='Comma-separated list of user IDs to monitor')
    parser.add_argument('duration', type=int, help='Duration to monitor in seconds')
    parser.add_argument('--test', action='store_true', help='Run in test mode for the current user and log commands locally')
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    if args.test:
        user_ids = [os.getuid()]  # Current user's UID for test mode
    else:
        user_ids = [int(uid.strip()) for uid in args.user_ids.split(',')]
    rules = setup_auditd(user_ids, args.test)
    monitor_auditd_logs(args.duration, rules, args.session_id, args.test)
