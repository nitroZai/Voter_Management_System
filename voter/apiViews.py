from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .serializers import UserSerializer, VoterSerializer, AreaSerializer, Candidate
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth import authenticate

from .models import *


@csrf_exempt
@api_view(['GET','POST'])
def apiLogin(request):

    if request.method == 'POST':

        print(request)

        userData = JSONParser().parse(request)
        
        username = userData['username']
        password = userData['password']

        print(username, password)

        x = authenticate(username=username, password=password)

        print(x)

        if x!= None:
            return JsonResponse( { 'username': username, 'password': password} )
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
        
