import os
from sqlalchemy import desc
from onsmash import db, hashids
from werkzeug import secure_filename

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_link = db.Column(db.String, nullable=False)
    hash = db.Column(db.String)
    thumbnail = db.Column(db.String)
    day_id = db.Column(db.Integer, db.ForeignKey("day.id"))
    
    def generate_thumbnail(self, upload_folder, file, extensions):
        filename = secure_filename(file.filename)
        ext = filename.rsplit(".",1)[1]
        if file and "." in file.filename and ext in extensions:
            filename = self.hash + "." + ext
            self.thumbnail = filename
            file.save(os.path.join(upload_folder, filename))
    
    def generate_hash(self):
        self.hash = hashids.encode(self.id)
        
    
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