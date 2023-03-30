from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


class SeccionTest(models.Model):
    name = models.CharField(verbose_name="Nombre Questionario", max_length=200)

    def __str__(self) -> str:
        return self.name


class Area(models.Model):
    name = models.CharField(verbose_name="Area", max_length=100)

    def __str__(self) -> str:
        return self.name
    
class Question(models.Model):
    question = models.CharField(max_length=200, verbose_name="Question")
    distractor1 = models.CharField(
        max_length=200, verbose_name="Distractor1", default=""
    )
    distractor2 = models.CharField(
        max_length=200, verbose_name="Distractor2", default=""
    )
    distractor3 = models.CharField(
        max_length=200, verbose_name="Distractor3", default=""
    )
    answer = models.CharField(max_length=200, verbose_name="respuesta")
    questionario = models.ForeignKey(SeccionTest, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.question

class DataColaboradores(models.Model):
    name_colaborador = models.CharField(
        max_length=200, verbose_name="nombre colaborador"
    )
    # email  = models.EmailField(verbose_name="correo electronico")
    phone = models.CharField(max_length=10, verbose_name="Celular")
    address = models.CharField(max_length=200, verbose_name="direccion")
    date_login = models.DateField(auto_now=True, verbose_name="Ingreso")
    area = models.ForeignKey(Area,on_delete=models.CASCADE)
    avatar = models.TextField(
        verbose_name="Avatar",
        default="https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
    )

    def __str__(self) -> str:
        return self.name_colaborador


class Usuario(models.Model):
    colaborador = models.ForeignKey(
        DataColaboradores, on_delete=models.CASCADE, null=True, blank=True
    )
    email = models.EmailField(default="")
    count_user = models.CharField(verbose_name="cuenta", max_length=200)
    password = models.CharField(verbose_name="Password", max_length=200)
    profile = models.CharField(verbose_name="Perfil", max_length=200)
    status = models.CharField(verbose_name="Status", max_length=200)

class Assigment(models.Model):

    colaborador = models.ForeignKey(
        DataColaboradores, verbose_name="Colaborador", on_delete=models.CASCADE
    )
    test = models.ForeignKey(
        SeccionTest, verbose_name="cuestionario", on_delete=models.CASCADE
    )
    status = models.CharField(
        verbose_name="Status", default="Sin calificacion", max_length=20,blank=True
    )
    score = models.FloatField(default=0, verbose_name="Porcentaje de calificacion",blank=True)
    

class Answers(models.Model):
    assigment = models.ForeignKey(
        Assigment, verbose_name="Asignacion", on_delete=models.CASCADE
    )
    question = models.ForeignKey(
        Question, verbose_name="Questionario", on_delete=models.CASCADE
    )
    answer = models.CharField(max_length=200, verbose_name="respuesta", default="")

    def __str__(self) -> str:
        return self.assigment
