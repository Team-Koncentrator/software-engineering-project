import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './HomeBottomSection.css';
import AddHouseBlock from './AddHouseBlock';

const HomeBottomSection = ({ houses, setHouses, fileContent }) => {
  const handleAddHouse = () => {
    setHouses([...houses]);
    return;
  };

  const countParticipants = (houses) => {
    //zliczanie uczestników ze wszystkich domków i pokojów

    return houses.length; // tymczasowo
  };

  return (
    <div className='houses-select'>
      <div>Ilość wprowadzonych uczestników z pliku: {JSON.stringify(fileContent.length)}</div>
      <div>Ilość użytkowników z domków: {JSON.stringify(countParticipants)}</div>
      <div className='add-house-block'>
        <span className='add-house-block__button-text'>Dodaj domek</span>
        <IconButton onClick={handleAddHouse}>
          <AddCircleOutlineIcon sx={{ fontSize: '28px' }}></AddCircleOutlineIcon>
        </IconButton>
        <div className='add-house-block__confirm-button'>
          <Button variant='contained'>Zatwierdź</Button>
        </div>
      </div>
      {houses.map((el) => (
        <AddHouseBlock key={el.id} data={el} />
      ))}
      <pre>{JSON.stringify(houses, undefined, 2)}</pre>
    </div>
  );
};

export default HomeBottomSection;
