from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authapi/', include('authUser.urls')),
    path('chatapi/', include('chat.urls')),
]
