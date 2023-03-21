from django.db import models
from django.contrib.auth.models import User

from multiselectfield import MultiSelectField
import os
import uuid
from datetime import datetime

def upload_to(instance, filename):
    ext = os.path.splitext(filename)[1]
    name = instance.name if instance.name else os.path.splitext(filename)[0]
    filename = '{}{}'.format(name, ext)
    return 'user_files/{}'.format(filename)

class FileModel(models.Model):
    #id=models.AutoField(primary_key=True)
    file = models.FileField(upload_to=upload_to)
    name = models.CharField(max_length=255, blank=True)
    size = models.PositiveIntegerField(null=True, blank=True)
    content = models.TextField(blank=True)
    # url = models.URLField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        self.name = os.path.splitext(os.path.basename(self.file.name))[0]
        self.size = self.file.size
        self.content = self.file.read().decode('utf-8')
        super().save(*args, **kwargs)
        # if not self.id:
        #     super().save(*args, **kwargs)
        #     self.url = 'http://127.0.0.1:8000/view-file/{}/'.format(self.id)
        # else:
        #     self.url = 'http://127.0.0.1:8000/view-file/{}/'.format(self.id)
        # super(NewFile, self).save(*args, **kwargs)

    def __str__(self):
        file_name = str(self.id)+"_"+str(self.name)
        return file_name

class Database(models.Model):
    file = models.FileField(upload_to="files")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=1000,default=file)

    # Workspace_id  =  Workspace

    def __str__(self):
        return f"File id: {self.id} name: {self.name}"

class Workspace(models.Model):
    workspace = models.AutoField(primary_key=True, editable = False, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    name =  models.CharField(max_length=10000,null=False, blank=False)
    database =  models.ForeignKey(FileModel, on_delete=models.CASCADE, blank=True, null=True)
    dashboards =  models.CharField(max_length=10000,null=True, blank=True)
    charts =  models.CharField(max_length=10000, null=True, blank=True)
    created_on = models.DateField(null=False, blank=False)
    last_edit = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Dashboard(models.Model):
    # dashboard = models.UUIDField(primary_key = True,
    #      default = uuid.uuid3,
    #      editable = False, unique=True)
    dashboard = models.AutoField(primary_key=True, editable = False, unique=True)
    name =  models.CharField(max_length=100, null=False, blank=False)
    charts =  models.CharField(max_length=5000,null= True, blank= True)
    text = models.CharField(max_length=10000, null=True, blank=True)
    created_on =  models.DateField(auto_now_add=True, blank=False, null=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    workspace_name = models.ForeignKey(Workspace, on_delete=models.CASCADE, blank=False, null=False)

    def __str__(self):
        return self.name

class Chart(models.Model):
    Area =  'area'
    Bar =  'bar'
    Bubble =  'bubble'
    Donut  = 'doughnut'
    Pie = 'pie'
    Line = 'line'
    Mixed = 'mixed'
    Polar = 'polar area'
    Radar = 'radar'
    Scatter = 'scatter'
    chart_options = [
        (Area, "Area Chart"),
        (Bar,  'Bar chart'),
        (Bubble ,  'Bubble chart'),
        (Donut  , 'Doughnut chart'), 
        (Pie ,'Pie chart'),
        (Line ,'Line chart'),
        (Mixed , 'Mixed Chart'),
        (Polar , 'Polar Area chart'),
        (Radar ,'Radar chart'),
        (Scatter,'Scatter chart'),
    ]

    edit_options = (
        ('title', 'title'),
        ('legend', 'legend'),
        ('color', 'color palette')
    )

    chart_id = models.AutoField(primary_key=True, editable = False, unique=True)
    title = models.CharField(max_length=1000, null=True, blank=True)
    x_axis = models.CharField(max_length=1000, null=False, blank=False, default=None)
    y_axis = models.CharField(max_length=1000, null=False, blank=False, default=None)
    chart_type = models.CharField(max_length=100, choices=chart_options,default=None, null=False, blank=False)
    options = models.CharField(max_length=1000, default=None)
    summary = models.CharField(max_length=1000, null=True, blank=True)
    workspace_name = models.ForeignKey(Workspace, on_delete=models.CASCADE, null=False, blank=False)
    dashboard_name = models.ForeignKey(Dashboard, on_delete=models.CASCADE, null=False, blank=False)


    def __str__(self):
        return self.title
        