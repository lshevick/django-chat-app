from rest_framework import generics, permissions

from .models import Room
from .serializers import RoomSerializer
from chats.models import Chat
from chats.serializers import ChatSerializer
# Create your views here.

class RoomListAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomChatListAPIView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        room = self.kwargs['room']
        return Chat.objects.filter(room=room)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
