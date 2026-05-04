from django.db import models

class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree      = models.CharField(max_length=200)
    field       = models.CharField(max_length=200)
    start_year  = models.IntegerField()
    end_year    = models.IntegerField(blank=True, null=True)
    is_current  = models.BooleanField(default=False)
    grade       = models.CharField(max_length=50, blank=True)
    order       = models.IntegerField(default=0)

    class Meta:
        ordering = ['-start_year']

    def __str__(self):
        return self.degree + ' at ' + self.institution