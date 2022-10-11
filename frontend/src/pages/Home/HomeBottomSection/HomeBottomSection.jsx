import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './HomeBottomSection.css';
import AddHouseBlock from './AddHouseBlock';
import axios from 'axios';

const HomeBottomSection = ({
  houses,
  setHouses,
  fileContent,
  peopleCounter,
  setPeopleCounter,
  confirmedHeader,
  houseIdCounter,
  setHouseIdCounter,
  roomIdCounter,
  setRoomIdCounter
}) => {
  const countPeople = () => {
    let counters = 0;
    counters = houses.map((house) => house.rooms.map((room) => (counters += room.size)));
    console.log(counters);
    if (counters.length >= 1) peopleCounter = counters.at(-1).at(-1);
    else peopleCounter = 0;

    setPeopleCounter(peopleCounter);
  };

  const handleAddHouse = () => {
    roomIdCounter.push(1);
    houseIdCounter += 1;
    setHouseIdCounter(houseIdCounter);
    const newHouse = {
      id: Math.random() * 0.8 + Math.PI,
      houseName: 'Domek ' + houseIdCounter,
      rooms: [{ id: Math.random() * 0.8 + Math.PI, name: 'Pokój 1', size: 2 }]
    };
    houses.push(newHouse);
    setHouses([...houses]);
    countPeople();
  };

  const submitAll = async (e) => {
    let dataToSend = { houses: houses, people: fileContent, header: confirmedHeader };
    console.log('dataToSend:');
    console.log(dataToSend);

    const options = { 'Content-Type': 'application/json' };
    try {
      const response = await axios.post('http://localhost:3001/api/houses/csv', dataToSend, options);
      console.log('response.data:');
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='houses-select'>
      <div>Ilość wprowadzonych uczestników z pliku: {JSON.stringify(fileContent.length)}</div>
      <div>Ilość miejsc w domkach: {peopleCounter}</div>
      <div className='add-house-block'>
        <span className='add-house-block__button-text'>Dodaj domek</span>
        <IconButton onClick={handleAddHouse}>
          <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      </div>
      {houses.map((el) => (
        <AddHouseBlock
          houses={houses}
          key={el.id}
          data={el}
          setHouses={setHouses}
          countPeople={countPeople}
          roomIdCounter={roomIdCounter}
          setRoomIdCounter={setRoomIdCounter}
        />
      ))}

      <div className='add-house-block__confirm-button'>
        <Button variant='contained' onClick={submitAll}>
          Zatwierdź
        </Button>
      </div>
    </div>
  );
};

export default HomeBottomSection;
