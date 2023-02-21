# Generated by Django 4.1.6 on 2023-02-17 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='chart_id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='dashboard',
            field=models.AutoField(editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='workspace',
            field=models.AutoField(editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]