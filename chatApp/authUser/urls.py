from django.urls import path
from .views import SignupView, LoginView, LogoutView, ValidatView, allUsers

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('validate/', ValidatView.as_view(), name='validate'),
    path('allusers/', allUsers.as_view(), name='allusers'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
