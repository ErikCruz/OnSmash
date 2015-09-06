from onsmash import app

from flask import render_template, redirect, url_for


@app.route("/")
def index():
    return redirect(url_for("videos"))

@app.route("/videos")
def videos():
    return render_template("videos/index.html")

@app.route("/videos/<hash>")
def video(hash):
    return render_template("videos/single.html")

@app.route("/videos/embed/<hash>")
def embed(hash):
    return render_template("videos/embed.html")