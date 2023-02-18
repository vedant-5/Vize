from django import forms 
from .models import Database

class DBModelForm(forms.ModelForm):
    class Meta:
        model = Database
        fields = ('file',)