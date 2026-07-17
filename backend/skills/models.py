from django.db import models

class Skill(models.Model):
    LEVEL_CHOICES = [
        ('beginner',     'Beginner'),
        ('intermediate', 'Intermediate'),
        ('expert',       'Expert'),
    ]

    name     = models.CharField(max_length=100)
    level    = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='intermediate')
    icon     = models.CharField(max_length=100, blank=True)
    order    = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name