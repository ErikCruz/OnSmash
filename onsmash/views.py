from onsmash import app

from flask import render_template, redirect, url_for


@app.route("/")
def index():
    return redirect(url_for("videos"))

@app.route("/videos")
def videos():
    return render_template("videos/index.html")