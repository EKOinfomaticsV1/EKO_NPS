from import_statements import *
n = 5 
@api_view(['GET'])
def index(request):
    user_data.objects.all().delete()
    return Response('done')

@api_view(['POST'])
def create_user(request):
    data = request.data
    try:
        username = data['username']
    except:
        res = {
                'status':False,
                'status_code':400,
                'title':'Bad Request',
                'message':'username is required'
              }
        return Response(res)
    try:
        email = data['email']
    except:
        res = {
                'status':False,
                'status_code':400,
                'title':'Bad Request',
                'message':'email is required'
              }
        return Response(res)

    try:
        org_name = data['org_name']
    except:
        res = {
                'status':False,
                'status_code':400,
                'title':'Bad Request',
                'message':'org_name is required'
              }
        return Response(res)
        
    try:
        password = data['password']
    except:
        res = {
                'status':False,
                'status_code':400,
                'title':'Bad Request',
                'message':'password is required'
              }
        return Response(res)
        
    # email validations
    if not validate_email(email):
        res = {
                'status':False,
                'status_code': 400,
                'title': 'Bad Request',
                'message': 'Email validation failed'
              }
        return Response(res)
    
    # email already exist check
    if not new_email_check(email):
        res = {
                'status':False,
                'status_code': 409,
                'title': 'Conflict',
                'message': 'Email already exist'
              }
        return Response(res)
    
    # organization alreay exist check
    if not new_organisation_check(org_name):
        res = {
                'status':False,
                'status_code': 409,
                'title': 'Conflict',
                'message': 'Organization already exist'
              }
        return Response(res)
    
    user_obj = user_data(
                            username = username,
                            email = email,
                            org_name = org_name,
                            password = make_password(password),
                            token = make_password(email+password)
                        )
    user_obj.save()
    res = {
            'status':True,
            'status_code':201,
            'title':'Created',
            'message':'User created successfully'
          }
    return Response(res)


@api_view(['POST'])
def file_upload(request):
    data = request.data
    token = data['token']
    
    #token check validation
    token_data = check_token(token)
    if token_data['status']:
        user_info = token_data['user_info']
    else:
        res = {
                'status':False,
                'status_code':401,
                'title':'Unauthorized',
                'message':'Authentication Failed'
              } 
        return Response(res)
    
    #file upload check
    try:
        file = request.FILES['file']
    except:
        res = {
                'status':False,
                'status_code':400,
                'title':'Bad Request',
                'message':'file is required'
              } 
        return Response(res)

    # file size validation
    file_size = round(file.size/1024,2)
    if file_size > 19999:
        res = {
                'status':False,
                'status_code':413,
                'title':'Content Too Large',
                'message':'File size exceeds 20MB'
              }
        return Response(res)
    
    # file extension validation
    ext = file.name.split('.')[-1]
    if ext == 'csv':
        df = pd.read_csv(file)
    elif ext == 'xlsx':
        df = pd.read_excel(file)
    else:
        res = {
                'status':False,
                'status_code':422,
                'title':'Unprocessable Content',
                'message':f'file extension should be .csv or .xlsx but your file was .{ext}'
              }
        return Response(res)
    # Column name validation
    df.columns = df.columns.str.lower()
    file_columns = list(df.columns)
    if 'review' not in file_columns:
        res = {
                'status':False,
                'status_code':417,
                'title':'Expectation Failed',
                'message':'review column is not present in file as expected'
              }
        return Response(res)
    
    if 'nps' not in file_columns:
        res = {
                'status':False,
                'status_code':417,
                'title':'Expectation Failed',
                'message':'nps column is not present in file as expected'
              }
        return Response(res)
    
    if 'date' not in file_columns:
        res = {
                'status':False,
                'status_code':417,
                'title':'Expectation Failed',
                'message':'date column is not present in file as expected'
              }
        return Response(res)
    
    # date column validation
    df['date_validator'] = df['date'].apply(date_validator)
    wrong_date = df.loc[df['date_validator'] == 0]
    print(wrong_date)
    if len(wrong_date) > 0:
        res = {
                'status':False,
                'status_code':406,
                'title':'Not Acceptable',
                'message':'Expected dateformat for date column is YYYY-mm-dd but got different in some cases'
              }
        return Response(res)
    
    return Response(token)




@api_view(['POST'])
def net_promoter_score(request):
    data = request.data
    token = data['token']
    token_data = check_token(token)
    if token_data['status']:
        user_info = token_data['user_info']
    else:
        res = {
                'status':False,
                'status_code':401,
                'title':'Unauthorized',
                'message':'Authentication Failed'
              } 
        return Response(res)
    
    return Response(user_info)
    