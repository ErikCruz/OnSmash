import os
from onsmash import app

# Get the host and port environment variables for cloud9
h = os.getenv("IP", "0.0.0.0")
p = int(os.getenv("PORT", 8080))

if __name__ == "__main__":
    app.run(host=h,port=p)