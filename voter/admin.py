from django.contrib import admin

from .models import Voter, Candidate, Area, User, CandidateCampaigns, CandidateComments

# Register your models here.
admin.site.register(Voter)
admin.site.register(User)
admin.site.register(Candidate)
admin.site.register(Area)
admin.site.register(CandidateCampaigns)
admin.site.register(CandidateComments)