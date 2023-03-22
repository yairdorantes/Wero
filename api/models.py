from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser



class SeccionTest(models.Model):
    name = models.CharField(verbose_name="Nombre Questionario",max_length=200)

    def __str__(self) -> str:
        return self.name

class Question(models.Model):
    question = models.CharField(max_length=200,verbose_name="Question")
    distractor1 = models.CharField(max_length=200,verbose_name="Distractor1",default="")
    distractor2 = models.CharField(max_length=200,verbose_name="Distractor2",default="")
    distractor3 = models.CharField(max_length=200,verbose_name="Distractor3",default="")
    answer  = models.CharField(max_length=200,verbose_name="respuesta")
    questionario =  models.ForeignKey(SeccionTest,on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.question
    

class DataColaboradores(models.Model):
    name_colaborador  = models.CharField(max_length=200,verbose_name="nombre colaborador")
    email  = models.EmailField(verbose_name="correo electronico")
    phone  =  models.CharField(max_length=10,verbose_name="Celular")
    address  =models.CharField(max_length=200,verbose_name="direccion")
    date_login  = models.DateField(auto_now=True,verbose_name="Ingreso")
    area =  models.CharField(verbose_name="Area",max_length=100)
    def __str__(self) -> str:
        return self.name_colaborador


class Assigment(models.Model):
    colaborador = models.ForeignKey(DataColaboradores,verbose_name="Colaborador",on_delete=models.CASCADE)
    test  =models.ForeignKey(SeccionTest,verbose_name="cuestionario",on_delete=models.CASCADE)
    status  = models.BooleanField(verbose_name="Status",default=False)

    def __str__(self) -> str:
        return self.colaborador
    
class Answers(models.Model):
    assigment   =models.ForeignKey(Assigment,verbose_name="Asignacion",on_delete=models.CASCADE)
    question  = models.ForeignKey(Question,verbose_name="Questionario",on_delete=models.CASCADE)
    answer  = models.CharField(max_length=200,verbose_name="respuesta",default="")
    def __str__(self) -> str:
        return self.assigment

class Usuario(models.Model):
    colaborador = models.ForeignKey(DataColaboradores,on_delete=models.CASCADE)
    count_user = models.CharField(verbose_name="cuenta",max_length=200)
    password = models.CharField(verbose_name="Password",max_length=200)
    profile = models.CharField(verbose_name="Perfil",max_length=200)
    status = models.BooleanField(verbose_name="Status",max_length=200)


# class usuario(AbstractUser):
#     test = models.CharField(verbose_name="test",max_length=200)
