# Generated by Django 5.0.3 on 2024-04-14 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_schools_school_image_alter_schools_school_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='schools',
            name='school_type',
            field=models.CharField(choices=[('College', 'College'), ('Senior High School', 'Senior High School'), ('Junior High School', 'Junior High School'), ('Elementary', 'Elementary'), ('Preschool', 'Preschool')], max_length=50, null=True),
        ),
    ]
