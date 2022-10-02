/**
 * Created by Pawel on 18.09.2022.
 */

//import Button from 'components/Button/Button';

/*
TODO:
 * wysłać fileContent do API
 * wysłać potwierdzone headery do API
 * przetworzyć fileContent do bazy danych
*/
import { Button, LinearProgress, Box, Typography, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import * as React from 'react';
import './Home.css';
import HomeSubPageForm from 'pages/HomeSubPageForm/HomeSubPageForm';
import { ConstructionOutlined, ReadMoreRounded, RedeemRounded } from '@mui/icons-material';
import { render } from '@testing-library/react';
import { useState, setFile } from 'react';

const Home = () => {
  const [progress, setProgress] = React.useState(66);
  const [file, setFile] = useState();
  const [fileContent, setFileContent] = useState();
  const [fileHeader, setFileHeader] = useState();
  const [confirmedHeader, setConfirmedHeader] = useState();
  let fileReader = new FileReader();

  /* *****************************
  handle functions for csv form
  ***************************** */

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        let [array, header] = parseCsv(csvOutput);

        setFileContent(array);
        setFileHeader(header);

        console.log(array);
        console.log(header);
      };

      fileReader.readAsText(file);
    }
  };

  const parseCsv = (csvText) => {
    const csvHeader = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const csvRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    const array = csvRows.map((row) => {
      const values = row.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    return [array, csvHeader];
  };

  /* ************************************
  handle functions for csv headers confirmation
  ************************************ */
  const handleOnSubmitConfirmedHeaders = (e) => {
    e.preventDefault();

    const form = document.getElementById('confirm-csv');

    let myHeader = {
      confirmedHeader: {
        name: form.name.value,
        surname: form.surname.value,
        gender: form.gender.value,
        age: form.age.value,
        withWho: form.with_who.value
      }
    };

    setConfirmedHeader(myHeader);
  };

  /* ************************************
  handle functions for progress bar
  ************************************ */
  const handleClick = (num) => {
    // 👇️ take parameter passed from Child component
    setProgress(() => num);
  };

  return (
    <>
      <div className='main-wrapper'>
        <div className='top-section'>
          <div className='wrapper__headers'>
            <div className='headers-section'>
              <h1 className='headers__main-header'>Przydziel uczestników do domków!</h1>
              <div className='headers__horizontal'></div>
              <h2 className='headers__second-header'>Nasza aplikacja ułatwia podział uczestników ze względu na płeć i wiek</h2>
              <p className='headers__content'>
                Spędzasz noce nad logistyką obozów i chcesz przed rozpoczęciem wiedzieć, jak najbardziej optymalnie przydzielić uczestników do domków
                i pokojów? Z naszą aplikacją to staje się dużo prostrze! Przygotuj plik xml, a my zrobimy resztę za ciebie :&#41;
              </p>
            </div>
            <div className='buttons-section'>
              <div className='buttons__file'>
                <Button variant='contained' component='label'>
                  Upload File
                  <input type='file' hidden onChange={handleOnChange} accept={'.csv'} />
                </Button>
              </div>
              <Typography variant='caption' sx={{ alignSelf: 'center' }}>
                Wymagany format pliku to .<strong>CSV</strong>
              </Typography>
              <div className='buttons__next'>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}>
                  ROZPOCZNIJ
                </Button>
              </div>
              <Typography variant='caption' sx={{ alignSelf: 'center' }}>
                naciśnij <strong>Enter</strong>
              </Typography>
            </div>
          </div>
          <div className='top-section__img-container'>
            <img src={require('images/mainImg.png')} alt='obrazek' className='img-container__img' />
          </div>
        </div>
        <div className='progress-bar-section'>
          <Typography variant='body2' sx={{ alignSelf: 'center' }}>
            Krok 1/3
          </Typography>
          <div className='linear-progress-container'>
            <LinearProgress variant='buffer' value={progress} sx={{ height: '10px', width: '100%', alignSelf: 'center' }}></LinearProgress>
            <Button variant='contained' sx={{ marginLeft: '20px', padding: '10px 16px' }}>
              <MdOutlineArrowBackIosNew className='icon'></MdOutlineArrowBackIosNew>
            </Button>
          </div>
        </div>
        <div>{progress}</div>
        <div>{JSON.stringify(fileContent)}</div>
        <div>
          <br />
        </div>
        <div id='view_csv'></div>

        {fileHeader && (
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

            <Button
              variant='contained'
              type='submit'
              onClick={(e) => {
                handleOnSubmitConfirmedHeaders(e);
              }}>
              DALEJ
            </Button>
          </form>
        )}
        {JSON.stringify(confirmedHeader)}
        <HomeSubPageForm handleClick={handleClick}></HomeSubPageForm>

        {fileHeader && confirmedHeader && fileContent && (
          <div>
            <Button variant='contained' type='submit'>
              Przydziel automatycznie
            </Button>
            <Button variant='contained' type='submit'>
              Przydziel samodzielnie
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
