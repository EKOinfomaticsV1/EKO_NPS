from django.urls import path
from manual_survey.views import *

urlpatterns = [
                path('survey_dashboard',survey_dashboard),
                path('survey_create',survey_create),
                path('survey_edit',survey_edit),
                path('survey_delete',survey_delete),
                path('excel_email_list',excel_email_list),
                path('send_email',send_email),
                path('response_from_survey',response_from_survey),
                path('survey_response_data',survey_response_data),
                path('survey_analytics',survey_analytics),


                # path('index',index),

]
