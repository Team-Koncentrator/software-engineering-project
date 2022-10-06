import React from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

  return (
    <div className='main-house-block'>
      <div>
        <p className='main-house-block__text'>{houseName}</p>
        <IconButton id={data.id} onClick={deleteHouse}>
          <DeleteForeverIcon />
        </IconButton>
      </div>

      <div className='main-house-block__room-block' id={data.id}>
        <IconButton id={data.id} onClick={addRoom}>
          Dodaj pokój
          <AddCircleOutlineIcon />
        </IconButton>
        {data.rooms.map((room) => (
          <React.Fragment key={room.id}>
            <p className='main-house-block__text'>{room.name}</p>
            <IconButton id={room.id} onClick={deleteRoom}>
              Usuń pokój
              <DeleteForeverIcon />
            </IconButton>

            <div className='main-house-block__input'>
              <TextField type='text' size='big' inputMode='numeric' pattern='[0-9]*' label='Ilość osób' />
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className='main-house-block__add-button'>
        <Button variant='contained'>Dodaj kolejny pokój</Button>
      </div>
    </div>
  );
};

export default AddHouseBlock;
