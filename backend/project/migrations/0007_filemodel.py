# Generated by Django 4.1.6 on 2023-03-19 16:42

from django.db import migrations, models
import project.models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_delete_newuser_alter_chart_chart_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=project.models.upload_to)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('size', models.PositiveIntegerField(blank=True, null=True)),
                ('content', models.TextField(blank=True)),
            ],
        ),
    ]