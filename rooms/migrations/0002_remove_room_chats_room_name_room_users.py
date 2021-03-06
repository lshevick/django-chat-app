# Generated by Django 4.0.5 on 2022-06-16 22:54

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rooms', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='chats',
        ),
        migrations.AddField(
            model_name='room',
            name='name',
            field=models.CharField(default=1, max_length=225, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
