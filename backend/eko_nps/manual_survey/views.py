from import_statements import *

@api_view(['GET'])
def index(request):
    survey_details.objects.all().delete()
    survey_responses.objects.all().delete()
    return Response('Hello')

@api_view(["POST"])
def survey_dashboard(request):
    if request.method == 'POST':
        res = {}
        survey_obj = survey_details.objects.values('id','name','created_at')
        if len(survey_obj) > 0:
            survey_obj = pd.DataFrame(survey_obj)
            survey_obj['created_at'] = survey_obj['created_at'].apply(lambda x : x.strftime('%d %b, %Y %H:%M:%S'))
            survey_obj = survey_obj.to_dict(orient='records')
        res['existing_surveys'] = survey_obj
        res['user_details'] = []
        return Response(res)

@api_view(['POST'])
def survey_create(request):
    if request.method == 'POST':
        survey_name = "Untitled Survey"
        survey_description = ""
        questions_snapshot = [
                                {
                                    'id': 1, 
                                    'question': 'On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?', 
                                    'question_type': 'Scale (0-10)', 
                                    'start_label': 'Extremely low', 
                                    'end_label': 'Extremely high', 
                                    'answer': '', 'required': False
                                }, 
                                {
                                    'id': 2, 
                                    'question': ' In your opinion, what improvements could the company make that would warrant a higher rating from you? ', 
                                    'question_type': 'Long Answer', 
                                    'answer': '', 
                                    'required': False
                                }
                             ]
        survey_model_obj = survey_details(
                                            name = survey_name, 
                                            description = survey_description, 
                                            questions_snapsot = questions_snapshot
                                         )
        survey_model_obj.save()
        res = {
                'status_code':200,
                'title':'survey created',
                'message':f'survey created with id {survey_model_obj.id} successfully',
              }
        return Response(res)

@api_view(['POST','PUT'])
def survey_edit(request):
    if request.method == 'PUT':
        data = request.data
        try:
            survey_basic_detail = data['survey_basic_detail']
        except:
            res = {
                'status_code':404,
                'title':'Field required',
                'message':f'survey_basic_detail field is required',
              }
            return Response(res)
        try:
            all_questionnaire = data['all_questionnaire']
        except:
            res = {
                'status_code':404,
                'title':'Field required',
                'message':f'all_questionnaire field is required',
              }
            return Response(res)
        survey_id = survey_basic_detail['id']     
        survey_name = survey_basic_detail['name']     
        survey_description = survey_basic_detail['description']     
        try:
            survey_details.objects.get(id = survey_id)
        except:
            res = {
                    'status_code':400,
                    'title':'Invalid survey ID',
                    'message':f'Survey ID not found in database',
                  }
            return Response(res)
        survey_details.objects.filter(id = survey_id)\
                              .update(
                                        name = survey_name, 
                                        description = survey_description, 
                                        questions_snapsot = all_questionnaire
                                     )
        
        res = {
                'status_code':200,
                'title':'Survey updated successfully',
                'message':f'Survey updated successfully',
              } 
        return Response(res)
    if request.method == 'POST':
        data = request.data
        try:
            survey_id = data['survey_id']
        except:
            res = {
                'status_code':404,
                'title':'Field required',
                'message':'survey_id field is required',
              }
            return Response(res)
        try:
            survey_obj = survey_details.objects.get(id = survey_id)
        except:
            res = {
                    'status_code':400,
                    'title':'Invalid survey ID',
                    'message':f'Survey ID not found in database',
                  }
            return Response(res)
        all_questionnaire = survey_obj.questions_snapsot
        survey_basic_detail = {
                    'id':survey_obj.id,
                    'name':survey_obj.name,
                    'description':survey_obj.description
                  }
        res = {
                'status_code':200,
                'title':'Survey details',
                'message':f'Survey details',
                'survey_basic_detail':survey_basic_detail,
                'all_questionnaire':all_questionnaire,
              }  
        return Response(res)
    
@api_view(['DELETE'])
def survey_delete(request):
    if request.method == 'DELETE':
        data = request.data
        survey_details.objects.filter(id = data['id']).delete()
        survey_responses.objects.filter(survey_id = data['id']).delete()
        res = {
                'status_code':200,
                'title':'survey deleted',
                'message':f'survey deleted successfully',
        }
        return Response(res)
    
@api_view(['POST'])
def excel_email_list(request):
    if request.method == 'POST':
        try:
            file = request.FILES['file']
        except:
            res = {
                'status_code':404,
                'title':'File required',
                'message':f'file is required',
              }
            return Response(res)
        file_extenssion = str(file.name).split('.')[-1]
        if file_extenssion not in ['xlsx','csv']:
            res = {
                'status_code':400,
                'title':'Invalid file',
                'message':f'accepted file extenssions are .csv or .xlsx but you provided .{file_extenssion}',
              }
            return Response(res)
        if file_extenssion == 'csv':
            email_df = pd.read_csv(file)
        elif file_extenssion == 'xlsx':
            email_df = pd.read_excel(file)
        else:
            res = {
                'status_code':400,
                'title':'Invalid file',
                'message':f'accepted file extenssions are .csv or .xlsx but you provided .{file_extenssion}',
              }
            return Response(res)
        email_df.columns = email_df.columns.str.strip().str.lower()
        if 'email' not in email_df.columns:
            res = {
                'status_code':404,
                'title':'Column missing',
                'message':f'Column named email is required',
              }
            return Response(res)
        email_list = list(email_df['email'])
        res = {
                'status_code':200,
                'title':'Email formatted',
                'message':f'Email formatted successfully',
                'emails': ','.join(email_list)
              }
        return Response(res) 

@api_view(['POST'])
def send_email(request):
    data = request.data
    try:
        emails = data['emails']
    except:
        res = {
                'status_code':404,
                'title':'Field required',
                'message':f'emails field is required',
              }
        return Response(res)
    try:
        subject = data['subject']
    except:
        res = {
                'status_code':404,
                'title':'Field required',
                'message':f'subject field is required',
              }
        return Response(res)
    try:
        msg = data['message']
    except:
        res = {
                'status_code':404,
                'title':'Field required',
                'message':f'messages field is required',
              }
        return Response(res)
    send_email = sendEmailFunc(emails,subject,msg)
    if send_email:
        res = {
                'status':True,
                'message':'Email sent successfully'
              }
    else:
        res = {
                'status':False,
                'message':'Something went wrong'
              }
    return Response(res)

@api_view(['POST'])
def response_from_survey(request):
    if request.method == 'POST':
        data = request.data   
        try:
            survey_basic_detail = data['survey_basic_detail']
        except:
            res = {
                'status_code':404,
                'title':'Field missing',
                'message':f'Field named survey_basic_detail is required',
              }
            return Response(res)
        try:
            survey_id = survey_basic_detail['id']
        except:
            res = {
                'status_code':404,
                'title':'Field missing',
                'message':f'Field named id in survey_basic_detail is required',
              }
            return Response(res)
        try:
            all_questionnaire = data['all_questionnaire']
        except:
            res = {
                'status_code':404,
                'title':'Field missing',
                'message':f'Field named all_questionnaire is required',
              }
            return Response(res)
        survey_res = {}
        for i in all_questionnaire:
            survey_res[i['question']] = i['answer']

        data = survey_responses(
                                    survey_id = survey_id,
                                    survey_res = survey_res,
                               )
        data.save()
        res = {
                'status_code':200,
                'title':'Response stored',
                'message':'Response stored successfully',
              }
        return Response(res)
    
@api_view(['POST'])
def survey_response_data(request):
    if request.method == 'POST':
        data = request.data   
        try:
            survey_id = data['survey_id']
        except:
            res = {
                    'status_code':404,
                    'title':'Field missing',
                    'message':f'Field named survey_id is required',
                  } 
            return Response(res)
        res = {}
        survey_data = survey_responses.objects.filter(survey_id = survey_id).values_list('survey_res',flat=True)    
        survey_data = list(survey_data)
        if len(survey_data) > 0:
            survey_df = pd.DataFrame(survey_data)
            survey_df.fillna('',inplace=True)
            res['questions'] = list(survey_df.columns)
            res['answers'] = survey_df.values.tolist()
        else:
            res['questions'] = []
            res['answers'] = []
        res['status_code'] = 200
        res['title'] = 'Response generated'
        res['message'] = f'Response generated for survey id {survey_id}'
        return Response(res)
    
@api_view(['POST'])
def survey_analytics(request):
    if request.method == 'POST':
        data = request.data
        survey_id = data['survey_id']
        nps = {}
        nps_question_name = "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?"
        survey_data = survey_responses.objects.filter(survey_id = survey_id).values_list('survey_res',flat=True)
        if len(survey_data) > 0:
            survey_df = pd.DataFrame(survey_data)
            survey_df[nps_question_name] = survey_df[nps_question_name].replace([''], 5)
            responses = survey_df.shape[0]
            promoters = len(survey_df.loc[survey_df[nps_question_name]>8])
            passive =  len(survey_df.loc[(survey_df[nps_question_name]>6) & (survey_df[nps_question_name]<8) ])
            detractors =  len(survey_df.loc[(survey_df[nps_question_name]<7)])
            nps_score = promoters/responses*100 - detractors/responses*100
            nps_score = 0 if nps_score < 0 else round(nps_score,2)
            avg_nps = round(sum(list(survey_df[nps_question_name]))/len(list(survey_df[nps_question_name])),2)
            cards = [
                        {
                            "title": "Responses",
                            "value": responses,
                            "unit": ''
                        },
                        {
                            "title": "NPS Score",
                            "value": nps_score,
                            "unit": ''
                        },
                        {
                            "title": "Avg NPS",
                            "value": avg_nps,
                            "unit": ''
                        },
                        {
                            "title": "Promoters",
                            "value": promoters,
                            "unit": ''
                        },
                        {
                            "title": "Passives",
                            "value": passive,
                            "unit": ''
                        },
                        {
                            "title": "Detractors",
                            "value": detractors,
                            "unit": ''
                        }
                    ]
            nps['cards'] = cards
            graphs = {}
            nps_pie_bar = {
                                "nps_score": nps_score,
                                "promoters": round(promoters/responses*100,2),
                                "total_promoters": promoters,
                                "passive": round(passive/responses*100,2),
                                "total_passive": passive,
                                "detractors": round(detractors/responses*100,2),
                                "total_detractors": detractors
                        }
            graphs['nps_pie_bar'] = nps_pie_bar
            nps_pie = [
                        {
                        "label": "Promoters",
                        "percentage": round(promoters/responses*100,2),
                        "color": "url(#promoterGradient)"
                        },
                        {
                        "label": "Passives",
                        "percentage": round(passive/responses*100,2),
                        "color": "url(#passiveGradient)"
                        },
                        {
                        "label": "Detractors",
                        "percentage": round(detractors/responses*100,2),
                        "color": "url(#detractorGradient)"
                        }
                    ]
            graphs['nps_pie'] = nps_pie
            nps['graphs'] = graphs
        else:
            nps = {
                    "cards": [
                    {
                        "title": "Responses",
                        "value": 0,
                        "unit": ''
                    },
                    {
                        "title": "NPS Score",
                        "value": 0,
                        "unit": ''
                    },
                    {
                        "title": "Avg NPS",
                        "value": 0,
                        "unit": ''
                    },
                    {
                        "title": "Promoters",
                        "value": 0,
                        "unit": ''
                    },
                    {
                        "title": "Passives",
                        "value": 0,
                        "unit": ''
                    },
                    {
                        "title": "Detractors",
                        "value": 0,
                        "unit": ''
                    }
                    ],
                    "graphs": {
                    "nps_pie_bar": {
                        "nps_score": 0,
                        "promoters": 0,
                        "total_promoters": 0,
                        "passive": 0,
                        "total_passive": 0,
                        "detractors": 0,
                        "total_detractors": 0
                    },
                    "nps_pie": [
                        {
                        "label": "Promoters",
                        "percentage": 0,
                        "color": "url(#promoterGradient)"
                        },
                        {
                        "label": "Passives",
                        "percentage": 0,
                        "color": "url(#passiveGradient)"
                        },
                        {
                        "label": "Detractors",
                        "percentage": 0,
                        "color": "url(#detractorGradient)"
                        }
                    ]
                    }
                }
        res = {}
        res['status_code'] = 200
        res['title'] = 'Dashboard Data'
        res['message'] = 'Dashboard data generated successfully'
        res['nps'] = nps
        return Response(res)

@api_view(['GET'])
def index(request):
    # survey_details.objects.all().delete()
    survey_responses.objects.all().delete()
    return Response('Hello')