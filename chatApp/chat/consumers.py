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

        await self.accept()

        messages = await self.get_message(self.room_name)

        await self.send(text_data = json.dumps({
            'message': messages
        }))
        
    @database_sync_to_async
    def get_message(self, room_name):
        try:
            room = ChatRoom.objects.get(room_name = room_name)
        except ChatRoom.DoesNotExist:
            return

        messages = room.messages.all().order_by('timestamp')
        serial = MessageSerializer(messages, many=True).data
        return serial
    
    async def disconnect(self, code):
        pass

    async def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        print(text_data_json)

        message = text_data_json['message']
        number = text_data_json['number']

        # room = database_sync_to_async(ChatRoom.objects.get)(roomname = self.room_name)
        # Message.objects.create()

        await self.send(text_data=json.dumps({
            'message': message,
            'number': number,
        }))