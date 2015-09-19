from flask_wtf import Form
from wtforms.fields import StringField, TextAreaField, FileField
from wtforms.validators import DataRequired

class VideoForm(Form):
    thumbnail = FileField("Thumbnail:", validators=[DataRequired()])
    title = StringField("Title:", validators=[DataRequired()])
    description = TextAreaField("Description:", validators=[DataRequired()])
    video_link = StringField("Video Link:", validators=[DataRequired()])