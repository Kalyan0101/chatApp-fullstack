import binascii
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import signupSerializer, customUserSerializer
from .models import CustomeUser, CustomeToken


# Create your views here.
class SignupView(APIView):
    def post(self, request):
        serializer = signupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            if user is not None:
                phnumber = request.data.get('phonenumber')
                return loginUser(request, phnumber)

            return Response(customUserSerializer(user).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        
        phonenumber = request.data.get('phonenumber')
        username = request.data.get('username')

        if not phonenumber or not username:
            return Response({"detail": "Username and phonenumber are required"}, status=status.HTTP_400_BAD_REQUEST)

        return loginUser(phonenumber)

class ValidatView(APIView):
    def get(self, request):
        
        if not request.headers.get('Authorization'):
            return Response({'message': 'missing header'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            token = request.headers['Authorization']
            customeToken = CustomeToken.objects.get(token = token)
            userData = customeToken.user
            userData = {
                'id': userData.id,
                'username': userData.username,
                'phonenumber': userData.phonenumber,
                'token': token,
            }
            return Response(userData, status=status.HTTP_200_OK)
        except CustomeToken.DoesNotExist:
            return Response({'message': 'Invalide token'}, status=status.HTTP_403_FORBIDDEN)
        
class LogoutView(APIView):
    
    def post(self, request):
        
        token = request.data.get('token')
        
        try:
            user = CustomeToken.objects.get(token = token)
            user.delete()
            return Response({"message": "Logged out successfully"},status=status.HTTP_202_ACCEPTED)
                        
        except:
            return Response({"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)

# helper method
def loginUser(phonenumber):
    
    try:
        user = CustomeUser.objects.get(phonenumber=phonenumber)
    except CustomeUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        customeToken = CustomeToken.objects.get(user = user)
                
    except CustomeToken.DoesNotExist:
        customeToken = CustomeToken.objects.create(
            token = generate_key(),
            user = user
        )
        
    if user is not None:
        
        user_data = customUserSerializer(user).data
        user_data['token'] = str(customeToken)
        
        return Response(user_data, status = status.HTTP_200_OK)
    
    return Response({"message": "Invalid creadentials"}, status=status.HTTP_400_BAD_REQUEST)

def generate_key():
        return binascii.hexlify(os.urandom(20)).decode()