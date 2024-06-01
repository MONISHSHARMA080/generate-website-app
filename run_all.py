import subprocess
import os
import time

def run_command(command, cwd=None, output_file=None):
    """Run a shell command in a specific directory and optionally save output to a file."""
    if output_file:
        with open(output_file, 'w') as f:
            process = subprocess.Popen(command, shell=True, cwd=cwd, stdout=f, stderr=f)
    else:
        process = subprocess.Popen(command, shell=True, cwd=cwd)
    return process

# Define the commands and their respective directories
commands = [
    ("python3 manage.py runserver", "/home/monish/code/Django/2/a_commit_behnd_tp_see_if_it_works", None),
    # ("ngrok http http://127.0.0.1:8000", "/home/monish/code/Django/2/a_commit_behnd_tp_see_if_it_works", "/home/monish/code/ngrok_output.txt"),
    ("npm run dev", "/home/monish/code/react/first-website", None),
    ("go run a.go", "/home/monish/code/react/first-website", None)
]

# File to store PIDs
pid_file = "/home/monish/code/pids.txt"

# Run the commands and store the PIDs
with open(pid_file, 'w') as f:
    processes = []
    for command, directory, output_file in commands:
        print(f"Running command: {command} in {directory}")
        process = run_command(command, cwd=directory, output_file=output_file)
        processes.append(process)
        
        # Save PID to file
        f.write(f"{process.pid}\n")
        
        # Give some time for each command to initialize
        time.sleep(1)

print("All commands have been executed and PIDs have been saved.")
