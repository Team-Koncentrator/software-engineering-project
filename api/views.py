from django.shortcuts import render
from rest_framework import generics
from api.serializers import RoomSerializer
from api.models import Room

# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

#class RoomView(generics.ListAPIView):
#    queryset = Room.objects.all()
#    serializer_class = RoomSerializer