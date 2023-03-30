from django.contrib import admin
from .models import (
    SeccionTest,
    Question,
    DataColaboradores,
    AssignmentPerSection,
    Assigment,
    Answers,
    Usuario,
    Area,
)

admin.site.register(
    [
        SeccionTest,
        Question,
        DataColaboradores,
        Answers,
        Usuario,
        Area,
        AssignmentPerSection,
        Assigment,
    ]
)
