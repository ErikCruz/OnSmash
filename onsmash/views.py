import os
import moment
from onsmash import app, db
from flask import render_template, redirect, url_for, request, flash, request, send_from_directory
from sqlalchemy import desc
from forms import VideoForm
from models import Day, Video
from werkzeug import secure_filename

@app.route("/")
def index():
    return redirect(url_for("videos"))

@app.route("/videos")
def videos():
    days = Day.query.order_by(desc(Day.id)).limit(4)
    return render_template("videos/index.html",days=days)

@app.route("/videos/<slug>")
def video(slug):
    video = Video.query.filter_by(slug=slug).first_or_404()
    return render_template("videos/single.html",video=video)

@app.route("/videos/embed/<slug>")
def embed(slug):
    video = Video.query.filter_by(slug=slug).first()
    return render_template("videos/embed.html",video=video)

@app.route("/videos/new", methods=["GET","POST"])
def new_video():
    form = VideoForm()
    if form.validate_on_submit():
        now = moment.now().format('dddd, MMMM D YYYY')
        today = Day.query.filter_by(date=now).first()
        if today is not None:
            video = Video(title=form.title.data,description=form.description.data,video_link=form.video_link.data,day_id=today.id)
            video.generate_slug()
            video.generate_thumbnail(app.config["UPLOAD_FOLDER"], form.thumbnail.data, app.config["ALLOWED_EXTENSIONS"])
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
            video.generate_thumbnail(app.config["UPLOAD_FOLDER"], form.thumbnail.data, app.config["ALLOWED_EXTENSIONS"])
            db.session.add(video)
            db.session.commit()
            flash("Video Successfully Added")
            return redirect(url_for("index"))
    return render_template("videos/new.html",form=form)

@app.route("/THUMBNAILS/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404