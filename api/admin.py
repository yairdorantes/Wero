from django.contrib import admin
from .models import (
    SeccionTest,
    Question,
    DataColaboradores,
    Assigment,
    Answers,
    Usuario,
    Area
)

from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.db import models
from django.contrib.admin import ModelAdmin

# class AssigmentForm(forms.ModelForm):
#     area_to_assign = forms.ModelMultipleChoiceField(
#         queryset=Area.objects.all(),
#         widget=FilteredSelectMultiple('Areas', is_stacked=False),
#         required=False,
#     )
#     select_all_areas = forms.BooleanField(label='Select all areas', required=False)

#     class Meta:
#         model = Assigment
#         fields = '__all__'

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         if self.instance.pk:
#             self.fields['area_to_assign'].initial = self.instance.area_to_assign.all()

#     def clean(self):
#         cleaned_data = super().clean()
#         if cleaned_data.get('select_all_areas'):
#             cleaned_data['area_to_assign'] = Area.objects.all()
#         return cleaned_data

# class AssigmentAdmin(ModelAdmin):
#     form = AssigmentForm

admin.site.register(Assigment)
admin.site.register([SeccionTest,Question,DataColaboradores,Answers,Usuario,Area])
