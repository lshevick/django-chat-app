from django.urls import path

from .views import ChatListAPIView

app_name = 'chats'

urlpatterns = [
    path('', ChatListAPIView.as_view(),)
]
