import React from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './HomeBottomSection.css';

const AddHouseBlock = ({ data, houses, setHouses }) => {
  const { houseName } = data;

  const removeHouse = (e) => {
    const houseId = e.currentTarget.id;
    const houseIndex = houses.findIndex((el) => el.id == houseId);
    const housesDeleted = houses.splice(houseIndex, 1);
    setHouses([...houses]);
    console.log(houseIndex);
  };

  return (
    <div className='main-house-block'>
      <div>
        <p className='main-house-block__text'>{houseName}</p>
        <IconButton id={data.id} onClick={removeHouse}>
          <DeleteForeverIcon />
        </IconButton>
      </div>

      <div className='main-house-block__room-block'>
        {data.rooms.map((room) => (
          <React.Fragment key={room.id}>
            <p className='main-house-block__text'>{room.name}</p>

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
