from secrets import choice
from django.db import models

# Create your models here.

class User(models.Model):
    GENDERS = (
            ('M', 'Male'),
            ('F', 'Female')
        )

    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    gender = models.CharField(max_length=1, null=False, choices=GENDERS)
    age = models.IntegerField(null=False)

class Room(models.Model):
    beds = models.IntegerField(null=False)
    name = models.CharField(max_length=50, default=f"x-bedded Room")
    roomates = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def is_full(self):
        "Returns if the room is full"

        if len(self.roomates) >= self.beds:
            return True

class House(models.Model):
    name = models.CharField(max_length=50, default="House")
    room_count = models.IntegerField(null=False)
    house_rooms = models.ForeignKey(Room, on_delete=models.CASCADE)

