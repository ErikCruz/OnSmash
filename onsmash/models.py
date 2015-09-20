import os
from slugify import slugify
from sqlalchemy import desc
from onsmash import db, app

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_link = db.Column(db.String, nullable=False)
    slug = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey("day.id"))
    
    def generate_thumbnail(self, upload_folder, file, extensions):
        ext = file.filename.rsplit(".",1)[1]
        if file and "." in file.filename and ext in extensions:
            filename = self.slug + "." + ext
            self.thumbnail = filename
            file.save(os.path.join(upload_folder, filename))
    
    def generate_slug(self):
        slg = slugify(self.title)
        q = self.query.filter_by(slug=slg).count()
        if q > 0:
            self.slug = slg + str(q)
        else:
            self.slug = slg
    
    def __repr__(self):
        return "<Video %s: %s>" % (self.id, self.title)

class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    videos = db.relationship("Video", backref="day",lazy="dynamic")
    
    def get_videos(self):
        return Video.query.filter_by(day_id=self.id).order_by(desc(Video.id)).all()
    
    def __repr__(self):
        return "<Day %s: %s>" % (self.id, self.date)