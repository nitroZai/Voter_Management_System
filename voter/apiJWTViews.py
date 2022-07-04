import datetime
import random
import string
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authentication import get_authorization_header
from rest_framework.views import APIView
from rest_framework import exceptions
from rest_framework.parsers import JSONParser
from .models import Reset, User, UserToken, Area, Voter, Candidate
from voter.serializers import AreaSerializer, CandidateSerializer, UserSerializer, VoterSerializer, CandidateSerializer
from django.core.mail import send_mail
from .apiJWTAuthentication import JWTAuthentication, create_access_token, create_refresh_token, decode_access_token, decode_refresh_token


class jwtRegisterAPIView(APIView):
    
    def post(self, request):

        # data = request.data
        userData = JSONParser().parse(request)

        username = userData['username']
        first_name = userData['first_name']
        last_name = userData['last_name']
        password = userData['password']
        password_confirm = userData['password_confirm']
        email = userData['email']
        area = userData['area']

        if userData['password'] != userData['password_confirm']:
            raise exceptions.APIException('Password do not match')

        if User.objects.filter(username=username).exists():
            raise exceptions.APIException('User already Exists')

        if len(username) < 3 & len(first_name) < 3 & len(last_name) < 3:
            raise exceptions.APIException('Length of names is less than the requirement')

        if len(password) < 3:
            raise exceptions.APIException('Length of the password cannot be less than 3')

        data = {
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
            'email': email,
            'password': password,
        }

        userSerializer = UserSerializer(data=data)

        # if userSerializer.is_valid():
        #     userSerializer.save()

        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()

        user = User.objects.get(username = username)
        print(area)

        voter = Voter()
        areaObject = Area.objects.get(area = area)
        voter.area = areaObject
        voter.user = user
        voter.status = "Pending"
        voter.save()

        return Response(userSerializer.data)

    def get(self, request):

        areas = Area.objects.all()
        areaSerial = AreaSerializer(areas, many = True)
        
        return JsonResponse(areaSerial.data, safe = False)

class jwtLoginAPIView(APIView):

    def post(self, request):

        print("hi")

        # authentication_classes = [JWTAuthentication]

        username = request.data['username']
        password = request.data['password']

        print(username, password)

        # user = User.objects.get(email=email)

        if User.objects.filter(username=username).exists():
            
            user = User.objects.get(username = username)
            userPasswordChecker = user.check_password(password)

            if not userPasswordChecker:
                raise exceptions.APIException('Wrong Password!')
            
        else:
            raise exceptions.APIException('Username doesn"t exist, Try again')



        user = User.objects.get(username = username)
        userPasswordChecker = user.check_password(password)
        print(userPasswordChecker)

        # if user is None:
        #     raise exceptions.AuthenticationFailed('invalid Credentials')

        # if not userPasswordChecker:
        #     raise exceptions.AuthenticationFailed('Invalid Credentials')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        # userTokenObject = UserToken()
        # userTokenObject.user_id = user.id
        # userTokenObject.token = refresh_token
        # userTokenObject.expired_at = datetime.datetime.utcnow() + datetime.timedelta(days = 7) 
        # userTokenObject.save()

        UserToken.objects.create(
            user_id = user.id, 
            token = refresh_token,
            expired_at = datetime.datetime.utcnow() + datetime.timedelta(days = 7)
        )

        response = Response()

        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token,
        }

        return response

        # userSerializer = UserSerializer(user)

        # return Response(userSerializer.data)


class jwtUserAPIView(APIView):
    
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class jwtRefreshAPIView(APIView):

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        print(id)
        if not UserToken.objects.filter(
            user_id = id,
            token = refresh_token,
            expired_at__gt = datetime.datetime.now(tz=datetime.timezone.utc)
        ).exists():
            raise exceptions.AuthenticationFailed('Unauthenticated')

        access_token = create_access_token(id)

        return Response({
            'token':access_token
            })

class jwtLogoutAPIView(APIView):

    def post(self, request):

        refresh_token = request.COOKIES.get('refresh_token')
        print(refresh_token)
        UserToken.objects.filter(
            token = refresh_token
        ).delete()

        response = Response()
        response.delete_cookie(key='refresh_token')
        
        response.data = {
            'message': 'success',
        }

        return response
