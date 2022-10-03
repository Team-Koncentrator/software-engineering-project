import { React } from 'react';
import { FormControl, Select, InputLabel, Button, MenuItem } from '@mui/material';
import './HomeConfirmHeaderForm.css';

const HomeConfirmHeaderForm = ({ fileHeader, handleOnSubmitConfirmedHeaders }) => {
  return (
    <div>
      <form id='confirm-csv'>
        <FormControl fullWidth>
          <InputLabel id='name-select-label'>Name</InputLabel>
          <Select labelId='name-select-label' id='name-select' label='Name' name='name'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='surname-select-label'>Surname</InputLabel>
          <Select labelId='surname-select-label' id='surname-select-label' label='Surname' name='surname'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='age-select-label'>Age</InputLabel>
          <Select labelId='age-select-label' id='age-select' label='Age' name='age'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select labelId='gender-select-label' id='gender-select-label' label='gender' name='gender'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='with-who-select-label'>With who</InputLabel>
          <Select labelId='with-who-select-label' id='with-who-select' label='With who' name='with_who'>
            {fileHeader.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Button variant='contained' type='submit' onClick={handleOnSubmitConfirmedHeaders}>
          DALEJ
        </Button>
      </form>
    </div>
  );
};

export default HomeConfirmHeaderForm;
