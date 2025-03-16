from authUser.models import CustomeUser
from .models import Message, ChatRoom
from rest_framework import serializers

class CustomeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomeUser
        fields = ['phonenumber']

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['room_name']

class MessageSerializer(serializers.ModelSerializer):

    phonenumber = CustomeUserSerializer(read_only = True)
    room = RoomSerializer(read_only = True)

    class Meta:
        model = Message
        fields = ['id', 'phonenumber', 'room', 'content', 'time', 'timestamp']

