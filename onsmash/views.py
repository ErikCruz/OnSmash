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
    days = Day.query.order_by(Day.id).all()
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
        now = moment.now().format('dddd, MMMM D YYYY')
        today = Day.query.filter_by(date=now).first()
        if today is not None:
            video = Video(title=form.title.data,description=form.description.data,video_link=form.video_link.data,day_id=today.id)
            video.generate_slug()
            db.session.add(video)
            db.session.commit()
            flash("Video Successfully Added")
            return redirect(url_for("index"))
        else:
            day = Day(date=now)
            db.session.add(day)
            db.session.flush()
            video = Video(title=form.title.data,description=form.description.data,video_link=form.video_link.data,day_id=day.id)
            video.generate_slug()
            db.session.add(video)
            db.session.commit()
            flash("Video Successfully Added")
            return redirect(url_for("index"))
    return render_template("videos/new.html",form=form)