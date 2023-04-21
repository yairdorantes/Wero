# Create your views here.
from django.views import View
import json
from django.http import JsonResponse, HttpResponse
from .models import Question, SeccionTest, Usuario, DataColaboradores, Assigment, Area
from django.forms.models import model_to_dict
import random
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q


class LoginView(View):
    def post(self, request):
        jd = json.loads(request.body)
        user = Usuario.objects.filter(email=jd["email"]).first()
        if user:
            if user.password == jd["password"]:
                user_dict = model_to_dict(user)
                print(user_dict)
                return JsonResponse({"user": user_dict})
            else:
                return HttpResponse("bad", 405)
        else:
            return HttpResponse("not found", 404)


class PerSection(View):
    def get(self, request):
        sections = list(SeccionTest.objects.values())
        areas = list(Area.objects.values())
        return JsonResponse({"sections": sections, "areas": areas})

    def post(self, request):
        jd = json.loads(request.body)
        for area in jd["areas"]:
            area_obj = Area.objects.get(id=area)
            for section in jd["sections"]:
                section_obj = SeccionTest.objects.get(id=section)
                for colaborador in DataColaboradores.objects.filter(area=area_obj):
                    Assigment.objects.create(test=section_obj, colaborador=colaborador)
        return HttpResponse(status=200)


class AssigmentsView(View):
    def get(self, request, id):
        # print(id)
        results = list(
            Assigment.objects.filter(colaborador_id=id).values(
                "test__name", "status", "score", "test__id"
            )
        )
        return JsonResponse({"results": results})

    def post(self, request):
        jd = json.loads(request.body)
        assigment = Assigment.objects.filter(
            colaborador=jd["user"],
            test=jd["test"],
        ).first()
        assigment.score = jd["score"]
        assigment.status = "Calificado"
        assigment.save()
        return JsonResponse({"score": "success"})


class UserInfo(View):
    def get(self, request, id):
        collaborator = DataColaboradores.objects.filter(id=id).first()
        collaborator_dict = model_to_dict(collaborator)
        area_name = collaborator.area.name if collaborator.area else None
        collaborator_dict["area_name"] = area_name

        return JsonResponse({"collaborator": collaborator_dict})


class Questions(View):
    def get(self, request, id, user_id):
        questions = list(Question.objects.filter(questionario=id).values())
        ass = Assigment.objects.filter(test_id=id, colaborador_id=user_id).first()
        # print("*****", user_id, "**********")
        for question in questions:
            answers = [
                {"answer": question.pop("answer")},
                {"distractor1": question.pop("distractor1")},
                {"distractor2": question.pop("distractor2")},
                {"distractor3": question.pop("distractor3")},
            ]
            random.shuffle(answers)
            question["answers"] = answers
        # print(ass.status)
        random.shuffle(questions)
        # answers = [{str(question["id"]): question["answer"]} for question in questions]
        # print("**********", ass)
        return JsonResponse(
            {"questions": questions, "status": ass.status, "score": ass.score}
        )

    def post(self, request):
        data = json.loads(request.body)
        data = data["data"]
        for row in data:
            try:
                if row[0] != "":
                    sec = row[5]
                    question = row[0]
                    distractor1 = row[1]
                    distractor2 = row[2]
                    distractor3 = row[3]
                    answer = row[4]
                    try:
                        relation = SeccionTest.objects.get(name=sec)
                    except ObjectDoesNotExist:
                        relation = SeccionTest.objects.create(name=sec)
                    Question.objects.create(
                        questionario=relation,
                        question=question,
                        distractor1=distractor1,
                        distractor2=distractor2,
                        distractor3=distractor3,
                        answer=answer,
                    )
            except Exception as e:
                print(e)
        return HttpResponse(200)
