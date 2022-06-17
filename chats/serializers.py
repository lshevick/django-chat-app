from rest_framework import serializers

from .models import Chat

class ChatSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    class Meta: 
        model = Chat
        fields = '__all__'
       