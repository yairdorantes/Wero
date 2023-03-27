from django.contrib import admin
from .models import (
    SeccionTest,
    Question,
    DataColaboradores,
    Assigment,
    Answers,
    Usuario,
)

admin.site.register(
    [SeccionTest, Question, DataColaboradores, Assigment, Answers, Usuario]
)
