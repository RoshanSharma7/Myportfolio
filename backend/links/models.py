from django.db import models

class ProfileLink(models.Model):
    name  = models.CharField(max_length=100)
    url   = models.URLField()
    icon  = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name