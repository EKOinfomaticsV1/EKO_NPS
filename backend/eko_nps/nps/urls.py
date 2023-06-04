from django.urls import path
from nps.views import *

urlpatterns = [
    path('nps_upload_button_status',nps_upload_button_status),
    path('file_upload',file_upload),
    path('net_promoter_score',net_promoter_score),
    path('netSentimentCard',netSentimentCard),
    path('net_cards',net_cards),
    path('all_comments',all_comments),
    path('all_alerts',all_alerts),
    path('nss_over_time',nss_over_time),


    path('test_api',test_api),
]
