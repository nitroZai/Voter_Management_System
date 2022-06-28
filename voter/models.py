from django.db import models
from django.contrib.auth.models import User

class Area(models.Model):
    
    area = models.CharField(max_length=20)
    area_id = models.IntegerField()

    def __str__(self) -> str:
        return self.area

class Voter(models.Model):

    PENDING = "Pending"
    ACCEPTED = "Accepted"
    DENIED = "Denied"

    STATUS_CHOICES = (
        (PENDING, "Pending"),(ACCEPTED, "Accepted"),(DENIED, "Denied")
    )

    user       = models.OneToOneField(User, on_delete=models.CASCADE)
    is_admin   = models.BooleanField(default=False)
    is_voted   = models.BooleanField(default=False)
    status     = models.CharField(max_length=10, default=ACCEPTED, choices=STATUS_CHOICES)
    area       = models.ForeignKey(Area, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.user.username

class Candidate(models.Model):
    candidate_name = models.CharField(max_length=50)
    votes          = models.IntegerField()
    area           = models.ForeignKey(Area, on_delete=models.PROTECT) 

    def __str__(self) -> str:
        return self.candidate_name