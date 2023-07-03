from django.db import models
from datetime import datetime
import pytz

# Create your models here.

class survey_details(models.Model):
    name = models.TextField(blank=False,null=False)
    description = models.TextField(blank=False,null=False)
    created_at = models.DateTimeField(default=str(datetime.now(pytz.timezone("Asia/Kolkata"))))
    questions_snapsot = models.JSONField()
    stop_status = models.BooleanField(default=False)
    deleted_status = models.BooleanField(default=False)

class survey_responses(models.Model):
    survey_id = models.TextField()
    survey_res = models.JSONField()
    created_at = models.DateTimeField(default=str(datetime.now(pytz.timezone("Asia/Kolkata"))))