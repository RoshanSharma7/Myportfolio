from django.db import models

class Certification(models.Model):
    title          = models.CharField(max_length=200)
    issuer         = models.CharField(max_length=200)
    issue_date     = models.DateField()
    expiry_date    = models.DateField(blank=True, null=True)
    credential_url = models.URLField(blank=True, null=True)
    image          = models.ImageField(upload_to='certifications/', blank=True, null=True)
    order          = models.IntegerField(default=0)

    class Meta:
        ordering = ['-issue_date']

    def __str__(self):
        return self.title + ' by ' + self.issuer