import moment
from onsmash import app, db
from flask import render_template, redirect, url_for, request, flash
from forms import VideoForm
from models import Day, Video


@app.route("/")
def index():
    return redirect(url_for("videos"))

@app.route("/videos")
def videos():
    days = Day.query.all()
    return render_template("videos/index.html",days=days)

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
        today = moment.now().format('dddd, MMMM D YYYY')
        # Check if today is already in our db
        today_has_videos = Day.query.filter_by(date=today).first()
        if today_has_videos:
            print "Date already in database"
        else:
            print "Date not in database, create it"
    return render_template("videos/new.html",form=form)