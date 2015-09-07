from onsmash import db

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_link = db.Column(db.String, nullable=False)
    slug = db.Column(db.String)
    
    def __repr__(self):
        return "<Video %s: %s>" % (self.id, self.title)