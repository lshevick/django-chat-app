# Generated by Django 4.0.5 on 2022-06-16 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_remove_room_chats_room_name_room_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
