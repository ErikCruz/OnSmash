from onsmash import db

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_link = db.Column(db.String, nullable=False)
    slug = db.Column(db.String, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey("day.id"))
    
    def __repr__(self):
        return "<Video %s: %s>" % (self.id, self.title)

class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    videos = db.relationship("Video", backref="day",lazy="dynamic")
    
    def __repr__(self):
        return "<Day %s: %s>" % (self.id, self.date)