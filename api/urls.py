from unicodedata import name
from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('rooms/', include('rooms.urls', namespace='rooms')),
    path('chats/', include('chats.urls', namespace='chats')),
]