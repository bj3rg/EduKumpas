# Generated by Django 5.0.3 on 2024-04-20 04:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_representative_school_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='representative',
            name='school_name',
        ),
    ]
