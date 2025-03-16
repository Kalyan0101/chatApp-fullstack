import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, ChatRoom
from authUser.models import CustomeUser
from channels.db import database_sync_to_async
from .serializers import MessageSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        messages = await self.get_message(self.room_name)

        # print(messages)

        await self.send(text_data = json.dumps({
            'message': messages
        }))
        
    @database_sync_to_async
    def get_message(self, room_name):
        try:
            room = ChatRoom.objects.get(room_name = room_name)
        except ChatRoom.DoesNotExist:
            return

        messages = room.room.all().order_by('timestamp')
        serial = MessageSerializer(messages, many=True).data
        return serial
    
    async def disconnect(self, code):
        pass

    async def receive(self, text_data=None):
        text_data_json = json.loads(text_data)

        message = text_data_json['message']
        number = text_data_json['number']
        time = text_data_json['time']

        await self.save_message(message, number)

        await self.channel_layer.group_send(
            self.room_group_name,{
                'type': 'chat_message',
                'message': message,
                'number': number,
                'time': time,
            })
        
    @database_sync_to_async
    def save_message(self, message, number):
        # Save the message to the database
        try:
            room = ChatRoom.objects.get(room_name=self.room_name)
        except ChatRoom.DoesNotExist:
            return
        
        user = CustomeUser.objects.get(phonenumber=number)
        Message.objects.create(
            room=room,
            phonenumber=user,
            content=message
        )

    async def chat_message(self, e):
        await self.send(text_data=json.dumps({
            'message': e['message'],
            'number': e['number'],
            'time': e['time'],
        }))