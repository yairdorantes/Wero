# Generated by Django 4.1.1 on 2023-03-30 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_remove_assigment_area_to_assign_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assigment',
            name='score',
            field=models.FloatField(blank=True, default=0, verbose_name='Porcentaje de calificacion'),
        ),
        migrations.AlterField(
            model_name='assigment',
            name='status',
            field=models.CharField(blank=True, default='Sin calificacion', max_length=20, verbose_name='Status'),
        ),
    ]
