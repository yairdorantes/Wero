# Generated by Django 4.1.1 on 2023-03-28 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_assigment_colaborador_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Area')),
            ],
        ),
        migrations.AlterField(
            model_name='datacolaboradores',
            name='area',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.area'),
        ),
    ]