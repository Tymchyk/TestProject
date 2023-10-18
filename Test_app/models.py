from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=150)
    created = models.DateTimeField()
    groups = models.ForeignKey("Groups", on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.groups.Name
    

class Groups(models.Model):
    Name = models.CharField(max_length=150)
    Descriptions = models.TextField()
    enable = models.BooleanField(default=True)

    def __str__(self):
        return self.Name