# Generated by Django 4.1.7 on 2023-03-25 23:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0010_remove_usuario_avatar_datacolaboradores_avatar"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assigment",
            name="status",
            field=models.CharField(
                default="Sin calificacion", max_length=20, verbose_name="Status"
            ),
        ),
    ]
