from .models import Message
from rest_framework import serializers

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'phonenumber_id', 'room_id', 'content', 'timestamp']

# class signupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomeUser
#         fields = [ 'phonenumber', 'username']
    
#     def create(self, validated_data):
#         user = CustomeUser.objects.create(
#             phonenumber = validated_data['phonenumber'],
#             username = validated_data['username'],
#         )
#         return user
