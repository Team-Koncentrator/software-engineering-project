import React, { useState } from 'react';
import { FormControl, Select, InputLabel, Button, MenuItem } from '@mui/material';
import './HomeConfirmHeaderForm.css';

const HomeConfirmHeaderForm = ({ fileHeader, sendDataToParent }) => {
  const [obj, setObj] = useState({
    name: '',
    surname: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((pre) => ({
      ...pre,
      [name]: value
    }));
  };

  return (
    <div>
      <form id='confirm-csv' className='confirm-csv'>
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='name-select-label'>Name</InputLabel>
          <Select value={obj.name} onChange={handleInputChange} labelId='name-select-label' id='name-select' label='Name' name='name'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='surname-select-label'>Surname</InputLabel>
          <Select
            value={obj.surname}
            onChange={handleInputChange}
            labelId='surname-select-label'
            id='surname-select-label'
            label='Surname'
            name='surname'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='age-select-label'>Age</InputLabel>
          <Select value={obj.age} onChange={handleInputChange} labelId='age-select-label' id='age-select' label='Age' name='age'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select value={obj.gender} onChange={handleInputChange} labelId='gender-select-label' id='gender-select-label' label='gender' name='gender'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Button
          variant='contained'
          type='submit'
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            sendDataToParent(obj);
          }}>
          Przejdź dalej!
        </Button>
      </form>
    </div>
  );
};

export default HomeConfirmHeaderForm;
