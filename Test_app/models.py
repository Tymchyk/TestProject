from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=150)
    created = models.DateTimeField()
    groups = models.ForeignKey("Groups", on_delete=models.CASCADE, default=None)

class Groups(models.Model):
    Name = models.CharField(max_length=150)
    Descriptions = models.TextField()

    def __str__(self):
        return self.Name