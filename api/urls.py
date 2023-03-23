from django.urls import path
from .views import Questions,LoginView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("questions",csrf_exempt(Questions.as_view()),name="questions"),
    path("login",csrf_exempt(LoginView.as_view()),name="login"),
    
]