from django.urls import path
from .views import Questions, LoginView, UserInfo, AssigmentsView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path(
        "questions/<int:id>/<int:user_id>",
        csrf_exempt(Questions.as_view()),
        name="questions",
    ),
    path("questions", csrf_exempt(Questions.as_view()), name="login"),
    path("login", csrf_exempt(LoginView.as_view()), name="login"),
    path("collaborator/<int:id>", csrf_exempt(UserInfo.as_view()), name="collaborator"),
    path("ass/<int:id>", csrf_exempt(AssigmentsView.as_view()), name="ass"),
    path("ass", csrf_exempt(AssigmentsView.as_view()), name="ass"),
]
