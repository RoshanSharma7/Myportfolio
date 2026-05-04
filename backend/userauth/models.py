from django.db import models

class Profile(models.Model):
    name                 = models.CharField(max_length=100)
    title                = models.CharField(max_length=200)
    bio                  = models.TextField()
    email                = models.EmailField()
    phone                = models.CharField(max_length=20,  blank=True)
    location             = models.CharField(max_length=200, blank=True)
    avatar               = models.ImageField(upload_to='avatar/', blank=True, null=True)
    projects_count       = models.CharField(max_length=10,  default='0+')
    experience_years     = models.CharField(max_length=10,  default='0+')
    certifications_count = models.CharField(max_length=10,  default='0+')
    technologies_count   = models.CharField(max_length=10,  default='0+')
    resume               = models.FileField(upload_to='resume/', blank=True, null=True)

    def __str__(self):
        return self.name