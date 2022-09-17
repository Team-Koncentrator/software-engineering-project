from django.urls import path, include
from .views import RoomView

urlpatterns = [
    path('view', RoomView.as_view())
]