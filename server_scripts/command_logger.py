import time
import argparse
import requests
import subprocess

def get_commands():
    # Get commands logged on the server
    command_output = subprocess.check_output(['journalctl', '--since', 'now', '-u', 'YOUR_SERVICE_NAME', '-o', 'cat'])
    commands = command_output.decode('utf-8').strip().split('\n')
    return commands

def post_commands_to_api(commands, api_endpoint):
    # Post commands to API endpoint
    for command in commands:
        data = {'command': command}
        response = requests.post(api_endpoint, json=data)
        print("Posted command:", command)
        print("Response:", response.status_code, response.text)

def main(duration, api_endpoint):
    start_time = time.time()
    while (time.time() - start_time) < duration:
        commands = get_commands()
        post_commands_to_api(commands, api_endpoint)
        time.sleep(5)  # rate limit a bit

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Post commands logged on the server to our UIs API endpoint.')
    parser.add_argument('duration', type=int, help='Duration of time to run the script in seconds')
    parser.add_argument('api_endpoint', type=str, help='API endpoint to post commands')
    args = parser.parse_args()

    main(args.duration, args.api_endpoint)


# Replace 'YOUR_SERVICE_NAME' with the name of the service whose commands you want to monitor. Adjust the sleep time in the main function according to your requirements.

# To run this script, save it to a file (e.g., command_logger.py) and run it from the command line like this:

# bash
# Copy code
# python command_logger.py DURATION API_ENDPOINT
# Replace DURATION with the duration of time in seconds and API_ENDPOINT with the URL of your API endpoint where you want to post the commands.