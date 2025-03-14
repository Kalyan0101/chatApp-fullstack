from django.contrib import admin
from .models import Message, ChatRoom

# Register your models here.
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_first_name', 'room_name', 'get_second_name')

    def get_first_name(self, obj):
        return obj.first_user.phonenumber
    
    def get_second_name(self, obj):
        return obj.second_user.phonenumber
    
    get_first_name.short_description = 'first user'
    get_second_name.short_description = 'second user'

class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'phonenumber', 'room', 'content', 'timestamp')


admin.site.register(Message, MessageAdmin)
admin.site.register(ChatRoom, RoomAdmin)