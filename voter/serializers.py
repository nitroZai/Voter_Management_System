from rest_framework import serializers
from voter.models import *
from django.contrib.auth.models import User 


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = (
            'username',
            'password'
        )

class AreaSerializer(serializers.ModelSerializer):

    class Meta:

        model = Area
        fields = (
            'area',
            'area_id'
        )

class VoterSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )
    area = serializers.SlugRelatedField(
        read_only=True,
        slug_field='area'
    )
    class Meta:

        model = Voter
        fields = (

            'user',
            'is_admin',
            'is_voted',
            'status',
            'area'

        )

class CandidateSerializer(serializers.ModelSerializer):

    area = serializers.SlugRelatedField(
        read_only=True,
        slug_field='area'
    )

    class Meta:

        model = Candidate
        fields = (

            'candidate_name',
            'votes',
            'area'

        )