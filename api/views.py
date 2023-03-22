# Create your views here.
from django.views import View
import json
from django.http import JsonResponse
from .models import Question,SeccionTest

class Questions(View):
 
    def get(self, request):
        questions = list(Question.objects.values())
        for question in questions:
            distractors = [
                question.pop('distractor1'),
                question.pop('distractor2'),
                question.pop('distractor3')
            ]
            question['distractors'] = distractors
        return JsonResponse({"questions": questions})
    def post(self, request):
        data = json.loads(request.body)
        data = data["data"]
        for row in data:
            try:
                if row[0] !="":
                    sec = row[5]
                    relation = SeccionTest.objects.get(name=sec)
                    question = row[0]
                    distractor1 = row[1]
                    distractor2 = row[2]
                    distractor3 = row[3]
                    answer =row[4]
                    Question.objects.create(questionario=relation, question=question,distractor1=distractor1,distractor2=distractor2,distractor3=distractor3,answer=answer)
            except Exception as e:
                print(e)
        return JsonResponse({"message": "success"})
        
        