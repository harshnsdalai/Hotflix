from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.


class My_list(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
