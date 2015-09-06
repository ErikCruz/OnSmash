from onsmash import app

@app.route("/")
def index():
    return "Welcome to my website!"