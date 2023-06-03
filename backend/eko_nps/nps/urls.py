from django.urls import path
from nps.views import *

urlpatterns = [
    path('net_promoter_score',net_promoter_score),
    path('file_upload',file_upload),
]
