from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser

class UserToken(models.Model):

    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()

class Reset(models.Model):

    username = models.EmailField(max_length=255)
    token = models.CharField(max_length=255, unique=True)

class User(AbstractUser):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = []

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

    user       = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    is_admin   = models.BooleanField(default=False)
    is_voted   = models.BooleanField(default=False)
    status     = models.CharField(max_length=10, default=ACCEPTED, choices=STATUS_CHOICES)
    area       = models.ForeignKey(Area, on_delete=models.PROTECT)
    is_candidate = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username

class Candidate(models.Model):

    candidate_username = models.CharField(max_length=255, default = 'raju')
    candidate_name = models.CharField(max_length=50)
    votes          = models.IntegerField()
    area           = models.ForeignKey(Area, on_delete=models.PROTECT) 

    def __str__(self) -> str:
        return self.candidate_name

class CandidateCampaigns(models.Model):

    candidate = models.ForeignKey(Candidate, on_delete=models.PROTECT)
    message = models.TextField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now = True)

class CandidateComments(models.Model):

    candidateCampaign = models.ForeignKey(CandidateCampaigns, on_delete=models.PROTECT)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now = True)
