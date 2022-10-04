import React from 'react';
import { Button, TextField } from '@mui/material';
import './HomeBottomSection.css';

const AddHouseBlock = ({ data }) => {
  const { houseName } = data;

  return (
    <div className='main-house-block'>
      <p className='main-house-block__text'>{houseName}</p>
      {data.rooms.map((room) => (
        <React.Fragment key={room.id}>
          <p className='main-house-block__text'>{room.name}</p>
          <div className='main-house-block__input'>
            <TextField type='text' size='big' inputMode='numeric' pattern='[0-9]*' label='Ilość osób' />
          </div>
        </React.Fragment>
      ))}
      <div className='main-house-block__add-button'>
        <Button variant='contained'>Dodaj kolejny pokój</Button>
      </div>
    </div>
  );
};

export default AddHouseBlock;
