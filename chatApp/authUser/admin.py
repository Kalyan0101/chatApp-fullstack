from django.contrib import admin
from .models import CustomeUser, CustomeToken


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'phonenumber')
    
class UserToken(admin.ModelAdmin)   :
    list_display = ('token', 'user', 'get_number', 'created')
    
    def get_number(self, obj):
        return obj.user.phonenumber
    get_number.short_description = 'Phone Number'
    

admin.site.register(CustomeUser, UserAdmin)
admin.site.register(CustomeToken, UserToken)
