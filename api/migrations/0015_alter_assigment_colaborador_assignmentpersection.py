# Generated by Django 4.1.1 on 2023-04-20 21:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0014_area_alter_datacolaboradores_area"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assigment",
            name="colaborador",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="api.datacolaboradores",
                verbose_name="Colaborador",
            ),
        ),
        migrations.CreateModel(
            name="AssignmentPerSection",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "area_to_assign",
                    models.ManyToManyField(to="api.area", verbose_name="area"),
                ),
                (
                    "tests_to_assign",
                    models.ManyToManyField(
                        to="api.secciontest", verbose_name="cuestionario"
                    ),
                ),
            ],
        ),
    ]
