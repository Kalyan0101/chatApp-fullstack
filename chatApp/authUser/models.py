""" customeToken model need to create because rest framework default token is not workable here, it by default want user name as parameter for creating the token and all to make core features intact i create custome token model and methods in view file still it use the core method to generate the token which written manually same case for the customeUser model """

from django.db import models

class CustomeUser(models.Model):
    phonenumber = models.CharField(max_length=15, unique=True)
    username = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.phonenumber

class CustomeToken(models.Model):
    
    token = models.CharField("key", max_length=15, primary_key=True)
    user = models.OneToOneField(
        CustomeUser, related_name='auth_token',
        on_delete=models.CASCADE, verbose_name="User"
    )
    created = models.DateTimeField("Created", auto_now_add=True)

    def __str__(self):
        return self.token