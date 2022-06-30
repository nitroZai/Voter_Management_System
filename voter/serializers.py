from rest_framework import serializers
from voter.models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
        ]
        # Or '__all__'

        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance 


# class UserSerializer(serializers.ModelSerializer):

#     class Meta:

#         model = User
#         fields = (
#             'username',
#             'password'
#         )

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