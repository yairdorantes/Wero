# Generated by Django 4.1.1 on 2023-03-22 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_users_usuario'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]
