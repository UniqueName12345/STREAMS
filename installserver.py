import subprocess


def are_dependencies_installed():
    try:
        subprocess.run(["npm", "list", "express", "socket.io", "simple-peer-server"], check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError:
        return False

print("Checking if dependencies are installed...")
if not are_dependencies_installed():
    print("Installing dependencies...")
    subprocess.check_call(["npm", "install", "express", "socket.io", "simple-peer-server"], check=True, capture_output=True)

print("Starting server...")
subprocess.check_call(["node", "server.js"])
