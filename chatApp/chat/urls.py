from django.urls import path
from .views import RoomViews


urlpatterns = [
    path('create-room/', RoomViews.as_view(), name='create-room'),
]
