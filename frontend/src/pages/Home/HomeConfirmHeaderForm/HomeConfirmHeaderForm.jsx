import React, { useState } from 'react';
import { FormControl, Select, InputLabel, Button, MenuItem } from '@mui/material';
import './HomeConfirmHeaderForm.css';

const HomeConfirmHeaderForm = ({ fileHeader, isHeaderConfirm, setIsHeaderConfirm, confirmedHeader, setConfirmedHeader }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfirmedHeader((pre) => ({
      ...pre,
      [name]: value
    }));
  };

  const handleSetConfirm = () => {
    setIsHeaderConfirm(!isHeaderConfirm);
  };

  const afterConfirmSubmit = () => {
    setTimeout(() => {
      let elmntToView = document.getElementById('home-bootom-wrapper--goto');
      console.log(elmntToView);
      elmntToView.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 100);
  };

  return (
    <div>
      <form id='confirm-csv' className='confirm-csv'>
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='name-select-label'>Name</InputLabel>
          <Select value={confirmedHeader.name} onChange={handleInputChange} labelId='name-select-label' id='name-select' label='Name' name='name'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='surname-select-label'>Surname</InputLabel>
          <Select
            value={confirmedHeader.surname}
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
          <Select value={confirmedHeader.age} onChange={handleInputChange} labelId='age-select-label' id='age-select' label='Age' name='age'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select
            value={confirmedHeader.gender}
            onChange={handleInputChange}
            labelId='gender-select-label'
            id='gender-select-label'
            label='gender'
            name='gender'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id='withWho'>With who</InputLabel>
          <Select
            value={confirmedHeader.withWho}
            onChange={handleInputChange}
            labelId='with_who-select-label'
            id='with_who-select-label'
            label='withWho'
            name='withWho'>
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
            handleSetConfirm();
            afterConfirmSubmit();
          }}>
          Przejdź dalej!
        </Button>
      </form>
    </div>
  );
};

export default HomeConfirmHeaderForm;
