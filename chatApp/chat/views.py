from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ChatRoom
from authUser.models import CustomeUser
from django.db.models import Q

# Create your views here.
class RoomViews(APIView):
    def post(self, request):

        # receive numbers of both users
        user1 = request.data.get('user1')
        user2 = request.data.get('user2')

        if user1 and user2 is None:
            return Response({'message': 'users error'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        try:
            one = CustomeUser.objects.get(phonenumber = user1)

        except CustomeUser.DoesNotExist:
            return Response({'message': 'user1 not found'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        try:
            two = CustomeUser.objects.get(phonenumber = user2)
        except CustomeUser.DoesNotExist:
            return Response({'message': 'user2 not found'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        
        roomname = f'{user1}_room_{user2}'

        try:
            chat_room = ChatRoom.objects.filter(
                Q(first_user_id = one.id) | Q(first_user_id = two.id) & Q(second_user_id = one.id) | Q(second_user_id = two.id)
            ).values("room_name")

            # print(chat_room)

            if chat_room:
                chat_room = chat_room[0]["room_name"]

            if not chat_room:
                chat_room = ChatRoom.objects.create(first_user_id = one.id, second_user_id = two.id, room_name = roomname)

        except Exception as e:
            print(e)
        
        # print(chat_room)

        if chat_room:
            return Response({'name': str(chat_room)},status=status.HTTP_200_OK)
        
        return Response({'message': 'room error'},status=status.HTTP_400_BAD_REQUEST)
        