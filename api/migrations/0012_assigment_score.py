# Generated by Django 4.1.7 on 2023-03-25 23:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0011_alter_assigment_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="assigment",
            name="score",
            field=models.IntegerField(
                default=0, verbose_name="Porcentaje de calificacion"
            ),
        ),
    ]