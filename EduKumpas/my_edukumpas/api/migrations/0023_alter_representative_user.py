# Generated by Django 5.0.3 on 2024-04-30 10:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_representative_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='representative',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.customuser'),
        ),
    ]
