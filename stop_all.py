import os
import signal
import time

# File containing PIDs
pid_file = "/home/monish/code/pids.txt"

# Stop the processes
if os.path.exists(pid_file):
    with open(pid_file, 'r') as f:
        pids = f.readlines()
    
    for pid in pids:
        pid = pid.strip()
        if pid:
            print(f"Stopping process with PID: {pid}")
            try:
                os.kill(int(pid), signal.SIGTERM)
                time.sleep(0.5)
            except ProcessLookupError:
                print(f"No process found with PID: {pid}")
            except Exception as e:
                print(f"Error stopping process with PID: {pid}: {e}")

    # Optionally, remove the PID file after stopping processes
    os.remove(pid_file)
else:
    print(f"No PID file found at {pid_file}")

print("All commands have been stopped.")
