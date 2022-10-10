import React from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import './HomeBottomSection.css';

const AddHouseBlock = ({ data, houses, setHouses, countPeople, roomIdCounter, setRoomIdCounter }) => {
  const { houseName } = data;

  const deleteHouse = (e) => {
    const houseId = e.currentTarget.id;
    const houseIndex = houses.findIndex((el) => el.id == houseId);

    houses.splice(houseIndex, 1);
    roomIdCounter.splice(houseIndex, 1);

    setHouses([...houses]);
    setRoomIdCounter(roomIdCounter);
    countPeople();
    console.log(roomIdCounter);
  };

  const addRoom = (e) => {
    const houseId = e.currentTarget.id;
    const houseIndex = houses.findIndex((el) => el.id == houseId);

    roomIdCounter[houseIndex] += 1;
    const room = { id: Math.random() * 0.8 + Math.PI, name: 'Pokój ' + roomIdCounter[houseIndex], size: 2 };
    houses[houseIndex].rooms.push(room);

    setRoomIdCounter(roomIdCounter);
    setHouses([...houses]);
    countPeople();
  };

  const deleteRoom = (e) => {
    const houseId = e.currentTarget.parentElement.id;
    const roomId = e.currentTarget.id;

    const houseIndex = houses.findIndex((el) => el.id == houseId);

    if (houses[houseIndex].rooms.length <= 1) return;
    const roomIndex = houses[houseIndex].rooms.findIndex((el) => el.id == roomId);

    houses[houseIndex].rooms.splice(roomIndex, 1);

    setHouses([...houses]);
    countPeople();
  };

  const changePeople = (e, add) => {
    const houseId = e.currentTarget.parentElement.id;
    const roomId = e.currentTarget.id;

    const houseIndex = houses.findIndex((el) => el.id == houseId);
    const roomIndex = houses[houseIndex].rooms.findIndex((el) => el.id == roomId);

    if (add) houses[houseIndex].rooms[roomIndex].size += 1;
    else {
      if (houses[houseIndex].rooms[roomIndex].size > 1) houses[houseIndex].rooms[roomIndex].size -= 1;
    }

    setHouses([...houses]);
    countPeople();
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!! UWAGA RUSZAJĄC DIVY !!!!!!!!!!!!!!!!!!!!!!!!!
  // dla funkcji deleteRoom, incr, decr, houseid jest zgarniany z parenta!!!!!!!

  return (
    <div className='main-house-block'>
      <div>
        <p className='main-house-block__text'>{houseName}</p>
        <IconButton id={data.id} onClick={deleteHouse}>
          <DeleteForeverIcon />
        </IconButton>
      </div>

      <div>
        <div className='main-house-block__add-button'>
          <Button id={data.id} onClick={addRoom} variant='contained'>
            Dodaj pokój
          </Button>
        </div>
      </div>

      <div className='main-house-block__room-block' id={data.id}>
        {data.rooms.map((room) => (
          <React.Fragment key={room.id}>
            <p className='main-house-block__text' id={data.id}>
              {room.name}
              <IconButton id={room.id} onClick={deleteRoom}>
                <DeleteForeverIcon />
              </IconButton>
            </p>

            <div id={data.id}>
              Pokój {room.size}-osobowy <br />
              <IconButton id={room.id} onClick={(e) => changePeople(e, true)}>
                <PersonAddIcon />
              </IconButton>
              <IconButton id={room.id} onClick={(e) => changePeople(e, false)}>
                <PersonRemoveIcon />
              </IconButton>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AddHouseBlock;
