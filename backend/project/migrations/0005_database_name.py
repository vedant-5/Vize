# Generated by Django 4.1.6 on 2023-02-21 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_alter_dashboard_charts_alter_dashboard_text_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='database',
            name='name',
            field=models.CharField(default=models.FileField(upload_to='files'), max_length=1000),
        ),
    ]