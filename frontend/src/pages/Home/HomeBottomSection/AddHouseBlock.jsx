import React from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import './HomeBottomSection.css';

const AddHouseBlock = ({ data, houses, setHouses }) => {
  const { houseName } = data;

  const deleteHouse = (e) => {
    const houseId = e.currentTarget.id;
    const houseIndex = houses.findIndex((el) => el.id == houseId);

    houses.splice(houseIndex, 1);

    setHouses([...houses]);
  };

  const addRoom = (e) => {
    const houseId = e.currentTarget.id;
    const houseIndex = houses.findIndex((el) => el.id == houseId);

    const room = { id: Math.random() * 0.8 + Math.PI, name: 'Pokój 2', people: '2' };

    houses[houseIndex].rooms.push(room);
    setHouses([...houses]);
  };

  const deleteRoom = (e) => {
    const houseId = e.currentTarget.parentElement.id;
    const roomId = e.currentTarget.id;

    const houseIndex = houses.findIndex((el) => el.id == houseId);
    const roomIndex = houses[houseIndex].rooms.findIndex((el) => el.id == roomId);

    houses[houseIndex].rooms.splice(roomIndex, 1);

    setHouses([...houses]);
  };

  const changePeople = (e, add) => {
    const houseId = e.currentTarget.parentElement.id;
    const roomId = e.currentTarget.id;

    const houseIndex = houses.findIndex((el) => el.id == houseId);
    const roomIndex = houses[houseIndex].rooms.findIndex((el) => el.id == roomId);

    if (add) houses[houseIndex].rooms[roomIndex].people += 1;
    else houses[houseIndex].rooms[roomIndex].people -= 1;

    setHouses([...houses]);
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
              {room.people}
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
