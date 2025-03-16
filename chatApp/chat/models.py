from django.db import models
from authUser.models import CustomeUser

class ChatRoom(models.Model):
    room_name = models.CharField(max_length=255, unique=True)
    first_user = models.ForeignKey(CustomeUser, related_name="firstUser", on_delete=models.CASCADE)
    second_user = models.ForeignKey(CustomeUser, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.room_name

class Message(models.Model):
    phonenumber = models.ForeignKey(CustomeUser, related_name='number', on_delete=models.CASCADE)
    room = models.ForeignKey(ChatRoom, related_name='room', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

    