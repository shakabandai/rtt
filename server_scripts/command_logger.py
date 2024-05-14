import argparse
import subprocess
import time
import requests
import os
import threading

API_ENDPOINT = "http://example.com/api/command"

def setup_auditd(user_ids, test_mode):
    rules = []
    # Monitor all commands executed in any shell by specified users
    for user_id in user_ids:
        rule = ["-a", "always,exit", "-F", "arch=b64", "-F", "euid={}".format(user_id), "-S", "execve"]
        subprocess.run(["auditctl"] + rule)
        rules.append(rule)
    return rules

def disable_auditd(rules):
    for rule in rules:
        subprocess.run(["auditctl", "-d"] + rule[1:])

def batch_send(commands, session_id, test_mode):
    if commands:
        if test_mode:
            for command in commands:
                print(f"Test Mode: {command['timestamp']} - User executed command: {command['command']}")
        else:
            response = requests.post(API_ENDPOINT, json={"commands": commands, "session_id": session_id})
            if response.status_code == 200:
                print("Batch of commands sent to API successfully.")
            else:
                print(f"Failed to send batch of commands to API: {response.status_code}")
        commands.clear()

def monitor_auditd_logs(duration, rules, session_id, test_mode):
    commands = []
    start_time = time.time()
    end_time = start_time + duration
    next_batch_time = time.time() + 0.5

    with subprocess.Popen(["tail", "-f", "/var/log/audit/audit.log"], stdout=subprocess.PIPE) as process:
        while time.time() < end_time:
            if time.time() >= next_batch_time:
                batch_send(commands, session_id, test_mode)
                next_batch_time = time.time() + 0.5
            
            line = process.stdout.readline()
            if line:
                timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                command = line.decode().strip()  # Simplified parsing; needs real implementation
                commands.append({"timestamp": timestamp, "command": command})

    batch_send(commands, session_id, test_mode)  # Send remaining commands at the end
    disable_auditd(rules)

def parse_arguments():
    parser = argparse.ArgumentParser(description='Monitor and batch send executed commands to an API or log them locally based on mode.')
    parser.add_argument('session_id', type=str, help='Session ID for the API')
    parser.add_argument('user_ids', type=str, help='Comma-separated list of user IDs to monitor')
    parser.add_argument('duration', type=int, help='Duration to monitor in seconds')
    parser.add_argument('--test', action='store_true', help='Run in test mode for the current user and log commands locally')
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    user_ids = [int(uid.strip()) for uid in args.user_ids.split(',')]
    rules = setup_auditd(user_ids, args.test)
    monitor_auditd_logs(args.duration, rules, args.session_id, args.test)


def test_command():
sudo ausearch -ts today -ui user_id -i | grep 'type=EXECVE' | awk '
BEGIN { cmd = "" }
/^a[0-9]+=/ {
    gsub(/^a[0-9]+="/, "", $0);
    gsub(/"$/, "", $0);
    cmd = (cmd == "" ? $0 : cmd " " $0);
}
/^$/ {
    if (cmd != "") print "Command executed:", cmd;
    cmd = "";
}'
