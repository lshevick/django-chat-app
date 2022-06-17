from django.urls import path

from .views import RoomListAPIView, RoomChatListAPIView, ChatDetailAPIView

app_name = 'rooms'

urlpatterns = [
    path('<int:room>/chats/<int:pk>/', ChatDetailAPIView.as_view()),
    path('<int:room>/chats/', RoomChatListAPIView.as_view()),
    path('', RoomListAPIView.as_view(),)
]
