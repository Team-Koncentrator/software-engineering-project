import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './HomeBottomSection.css';
import AddHouseBlock from './AddHouseBlock';

const HomeBottomSection = ({ houses, setHouses, fileContent, peopleCounter, setPeopleCounter }) => {
  const countPeople = () => {
    let counters = 0;
    counters = houses.map((house) => house.rooms.map((room) => (counters += room.people)));

    if (counters.length) peopleCounter = counters.at(-1).at(-1);
    else peopleCounter = 0;

    setPeopleCounter(peopleCounter);
  };

  const handleAddHouse = () => {
    setHouses([
      ...houses,
      {
        id: Math.random() * 0.8 + Math.PI,
        houseName: 'Domek 1',
        rooms: [{ id: Math.random() * 0.8 + Math.PI, name: 'Pokój 1', people: 2 }]
      }
    ]);
  };
  countPeople();

  const submitAll = (e) => {
    console.log(e);
  };

  return (
    <div className='houses-select'>
      <div>Ilość wprowadzonych uczestników z pliku: {JSON.stringify(fileContent.length)}</div>
      <div onClick={countPeople}>Ilość wprowadzonych uczestników {peopleCounter}</div>
      <div className='add-house-block'>
        <span className='add-house-block__button-text'>Dodaj domek</span>
        <IconButton onClick={handleAddHouse}>
          <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      </div>
      {houses.map((el) => (
        <AddHouseBlock houses={houses} key={el.id} data={el} setHouses={setHouses} />
      ))}
      <div className='add-house-block__confirm-button'>
        <Button variant='contained' onClick={submitAll}>
          Zatwierdź
        </Button>
      </div>
      <pre>{JSON.stringify(houses, undefined, 2)}</pre>
    </div>
  );
};

export default HomeBottomSection;
