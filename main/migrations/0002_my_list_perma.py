# Generated by Django 2.1.2 on 2019-05-16 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='my_list',
            name='perma',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
