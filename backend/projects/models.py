from django.db import models

class Project(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('ongoing',   'Ongoing'),
    ]

    title       = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack  = models.CharField(max_length=500)
    github_url  = models.URLField(blank=True, null=True)
    live_url    = models.URLField(blank=True, null=True)
    thumbnail   = models.ImageField(upload_to='projects/', blank=True, null=True)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    order       = models.IntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title