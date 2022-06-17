from sqlite3 import Timestamp
from django.db import models
from django.conf import settings
from rooms.models import Room
# Create your models here.

class Chat(models.Model):
    text = models.TextField(unique=False, blank=False, max_length=900)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.text