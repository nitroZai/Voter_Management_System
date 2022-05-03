from django.contrib import admin

from .models import Voter, Candidate, Area

# Register your models here.
admin.site.register(Voter)
admin.site.register(Candidate)
admin.site.register(Area)