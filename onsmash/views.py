from onsmash import app

from flask import render_template, redirect, url_for, request, flash
from forms import VideoForm


@app.route("/")
def index():
    return redirect(url_for("videos"))

@app.route("/videos")
def videos():
    return render_template("videos/index.html")

@app.route("/videos/<slug>")
def video(slug):
    return render_template("videos/single.html")

@app.route("/videos/embed/<hash>")
def embed(hash):
    return render_template("videos/embed.html")

@app.route("/videos/new", methods=["GET","POST"])
def new_video():
    form = VideoForm()
    if form.validate_on_submit():
        return "TODO create a new video and day if necessary"
    return render_template("videos/new.html",form=form)