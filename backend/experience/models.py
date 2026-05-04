from django.db import models

class Experience(models.Model):
    company     = models.CharField(max_length=200)
    role        = models.CharField(max_length=200)
    location    = models.CharField(max_length=200, blank=True)
    start_date  = models.DateField()
    end_date    = models.DateField(blank=True, null=True)
    is_current  = models.BooleanField(default=False)
    description = models.TextField()
    order       = models.IntegerField(default=0)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.role + ' at ' + self.company