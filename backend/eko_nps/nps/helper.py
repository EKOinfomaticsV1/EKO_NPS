import re  
from datetime import datetime
from nps.models import *

# email validation
def validate_email(email):  
    if re.match(r"[^@]+@[^@]+\.[^@]+", email):  
        return True  
    return False  

# email already exist check
def new_email_check(email):
    try:    
        user_data.objects.get(email = email)
        return False
    except:
        return True
    
# Organization already exist check   
def new_organisation_check(org_name):
    try:
        user_data.objects.get(org_name = org_name)
        return False
    except:
        return True
    
# token varification
def check_token(token):
    try:
        user = user_data.objects.get(token = token)
        res = { 'status':True,
                'user_info':{   
                                'user_id':user.id,
                                'username':user.username,
                                'org_name':user.org_name,
                                'email':user.email
                            }
              }
        return res
    except:
        res = {
                'status':False
              }
        return res
    
def date_validator(date):
    try:
        datetime.strptime(str(date)[:10], "%Y-%m-%d")
        return 1
    except:
        return 0