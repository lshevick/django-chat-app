from django.db import models

# Create your models here.

class Room(models.Model):
    chats = models.JSONField(default=[])