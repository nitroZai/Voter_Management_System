import email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .serializers import UserSerializer, VoterSerializer, AreaSerializer, CandidateSerializer
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth import authenticate
from django.db.models import Q

from .models import *

@api_view(['GET', 'POST'])
def apiGetVoter(request):

    if request.method == 'POST':

        username = request.data['username']
        user = User.objects.get(username=username)
        voter = Voter.objects.get(user = user)

        return JsonResponse({'is_admin': voter.is_admin, 'status': voter.status, 'is_voted': voter.is_voted})


@csrf_exempt
@api_view(['GET','POST'])
def apiLogin(request):

    if request.method == 'POST':

        print(request)

        # userData = JSONParser().parse(request)
        
        # username = userData['username']
        # password = userData['password']

        username = request.data['username']
        password = request.data['password']

        print(username, password)

        x = authenticate(username=username, password=password)

        print(x)

        user = User.objects.get(username=username)
        voter = Voter.objects.get(user = user)

        voterSerial = VoterSerializer(voter)

        if x!= None:
            return JsonResponse( voterSerial.data )
        return JsonResponse("Failed", safe=False)

@csrf_exempt
@api_view(['POST', 'GET'])
def apiRegister(request):

    if request.method == 'POST':
        print(request)

        userRegistrationData = JSONParser().parse(request)
        
        username = userRegistrationData['username']
        password = userRegistrationData['password']
        email = userRegistrationData['password']
        area = userRegistrationData['area']

        areaObject = Area.objects.get(area = area)

        user = User()
        user = User.objects.create_user(username = username, email = email)
        user.set_password(password)
        user.save()

        voter = Voter()
        voter.user = user
        voter.area = areaObject
        voter.is_admin = False
        voter.status = "Pending"
        voter.save()

        return JsonResponse("Successfully LoggedIn", safe = False)
    
    elif request.method == 'GET':
        
        areas = Area.objects.all()
        areaSerial = AreaSerializer(areas, many = True)
        
        return JsonResponse(areaSerial.data, safe = False)
        
@csrf_exempt
@api_view(['POST'])
def apiLoginCheck(request):

    if request.method == 'POST':

        try:
            
            username = request.data['username']
            print(username)

            user = User.objects.get(username=username)
            voter = Voter.objects.get(user = user)
            print(voter)
            voterSerial = VoterSerializer(voter)
            return JsonResponse(voterSerial.data, safe = False)

        except:

            return JsonResponse(True, safe= False)

@api_view(['GET', 'POST'])
def apiGetSpecificLocationCandidates(request):
    
    if request.method == 'POST':
        
        # Get the Username
        # Using User's Location, Get the candidates

        userData = JSONParser().parse(request)

        username = userData['user']

        user = User.objects.get(username= username)
        voter = Voter.objects.get(user = user)
        print(voter)
        voterArea = Area.objects.get(area = voter.area.area)
        print(voterArea)
        candidates = Candidate.objects.filter(area = voterArea)
        print(candidates)
        candidateSerial = CandidateSerializer(candidates, many = True)

        return JsonResponse(candidateSerial.data, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def apiAllCandidates(request):

    if request.method == 'GET':

        candidates = Candidate.objects.all()
        candidateSerial = CandidateSerializer(candidates, many = True)

        return JsonResponse(candidateSerial.data, safe = False) 

    elif request.method == 'POST':
        print(request.data)

        if request.data:
            username = request.data['username']
            candidateName = request.data['candidateName']
            
            user = User.objects.get(username = username)
            Voter.objects.filter(user = user).update(is_voted = True)

            candy = Candidate.objects.get(candidate_name = candidateName)
            candyVotes = candy.votes + 1

            Candidate.objects.filter(candidate_name = candidateName).update(votes = candyVotes)
            return JsonResponse("Candidate Voted Successfully", safe = False)

        return JsonResponse("Candidate Does not exist", safe= False)

@api_view(['GET', 'POST'])
def apiAnalytics(request):

    if request.method == "GET":
        candidates = Candidate.objects.all()
        candidateSerial = CandidateSerializer(candidates, many = True)
        return JsonResponse(candidateSerial.data, safe= False)
    
@api_view(['GET', 'POST'])
def apiSegregations(request):

    if request.method == "GET":
        
        voters = Voter.objects.all()
        # return JsonResponse(dict(users),safe=False)
        
        voterSerial = VoterSerializer(voters, many= True)

        # e = []

        # for voter in voters:
        #     e.append(voter)
        # data = {"data": e}


        return JsonResponse(voterSerial.data, safe=False)


def apiPermissions(request):

    if request.method == "GET":
        
        voters = Voter.objects.all()
        voterSerial = VoterSerializer(voters, many= True)
        return JsonResponse(voterSerial.data, safe=False)

@api_view(['GET', 'POST'])
def apiAdminPermissions(request):

    if request.method == "POST":

        adminPermissionData = JSONParser().parse(request)

        is_admin = adminPermissionData['is_admin']
        voterUsername = adminPermissionData['voter']

        print(is_admin, voterUsername)
        user = User.objects.get(username = voterUsername)
        voter = Voter.objects.filter(user = user).update(is_admin = is_admin)

        return JsonResponse("Made Admin", safe = False)



@api_view(['GET', 'POST'])
def apiAdminUserStatus(request):
    
    if request.method == 'POST':

        userStatusData = JSONParser().parse(request)

        accountStatus = userStatusData['status']
        voterUsername = userStatusData['voter']
        print(accountStatus, voterUsername)

        user = User.objects.get(username=voterUsername)
        voter = Voter.objects.filter(user = user).update(status = accountStatus)

        return JsonResponse("User Account Status changed", safe=False)

@api_view(['GET', 'POST'])
def apiAdminPermissionsSearch(request):

    if request.method == 'POST':

        searchData = JSONParser().parse(request)

        searchField = searchData['searchField']
        print(searchField)
        users = User.objects.filter(username__icontains = searchField)
        # areas = Area.objects.filter(area__icontains = searchField)
        voters = Voter.objects.filter(user__in = users)

        voterSerial = VoterSerializer(voters, many = True)

        return JsonResponse(voterSerial.data, safe=False)

