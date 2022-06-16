from django.db import models
from django.conf import settings


# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=255, unique=True, blank=False,)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return self.name