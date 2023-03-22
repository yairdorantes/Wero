from django.urls import path
from .views import Questions
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("questions",csrf_exempt(Questions.as_view()),name="questions"),
    
]