from flask_wtf import Form
from wtforms.fields import StringField, TextAreaField
from wtforms.validators import DataRequired

class VideoForm(Form):
    title = StringField("Title:", validators=[DataRequired()])
    description = TextAreaField("Description:", validators=[DataRequired()])
    video_link = StringField("Video Link:", validators=[DataRequired()])