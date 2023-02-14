from django.db import models

from multiselectfield import MultiSelectField

import uuid

# Create your models here.
class NewUser(models.Model):
    username = None
    user_id = models.UUIDField(primary_key = True,
         default = uuid.uuid4,
         editable = False)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=13, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    # objects = CustomUserManager()

    def __str__(self):
        return self.email

class Database(models.Model):
    name = models.TextField(max_length=100, null=False, blank=False)
    # Workspace_id  =  Workspace

class Workspace(models.Model):
    workspace_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(NewUser, on_delete=models.CASCADE, blank=False, null=False)
    name =  models.TextField(max_length=100,null=False, blank=False)
    database =  models.ForeignKey(Database, on_delete=models.CASCADE, blank=True, null=True)
    dashboards =  models.CharField(max_length=10000,null=True, blank=True)
    charts =  models.CharField(max_length=10000, null=True, blank=True)
    preview_image = models.ImageField(blank=False, null=False)
    created_on = models.DateField(null=False, blank=False)
    last_edit = models.DateTimeField(null=False, blank=True)

    def __str__(self):
        return self.name


class Dashboard(models.Model):
    dashboard_id = models.UUIDField(primary_key = True,
         default = uuid.uuid4,
         editable = False)
    name =  models.CharField(max_length=100, null=False, blank=False)
    charts =  models.TextField(max_length=5000,null=False, blank= False)
    image = models.ImageField(blank=True, null=True)
    text = models.TextField(max_length=10000, null=True, blank=True)
    created_on =  models.DateTimeField()
    created_by = models.ForeignKey(NewUser, on_delete=models.CASCADE, blank=False, null=False)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, blank=False, null=False)

    def __str__(self):
        return self.dashboard_id


class Chart(models.Model):
    Area =  'area chart'
    Bar =  'bar chart'
    Bubble =  'bubble chart'
    Donut  = 'doughnut chart'
    Pie = 'pie chart'
    Line = 'line chart'
    Mixed = 'mixed chart'
    Polar = 'polar area chart'
    Radar = 'radar chart'
    Scatter = 'scatter chart'
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

    chart_id = models.UUIDField(primary_key = True,
         default = uuid.uuid4,
         editable = False)
    name =  models.CharField(max_length=100, null=False, blank=False)
    title = models.CharField(max_length=20, null=True, blank=True)
    axis = models.CharField(max_length=1000, null=True, blank=True)
    chart_type = models.CharField(max_length=100, choices=chart_options,default=None, null=False, blank=False)
    # options = MultiSelectField(choices=edit_options, default=None)
    summary = models.CharField(max_length=1000, null=True, blank=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.chart_id