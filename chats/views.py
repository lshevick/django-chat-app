from rest_framework import generics

from .models import Chat
from .serializers import ChatSerializer

# Create your views here.

class ChatListAPIView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer