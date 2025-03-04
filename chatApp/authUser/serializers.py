from .models import CustomeUser
from rest_framework import serializers

class customUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomeUser
        fields = ['id', 'username', 'phonenumber']

class signupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomeUser
        fields = [ 'phonenumber', 'username']
    
    def create(self, validated_data):
        user = CustomeUser.objects.create(
            phonenumber = validated_data['phonenumber'],
            username = validated_data['username'],
        )
        return user
