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
  let fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmitConfirmedHeaders = (e) => {
    e.preventDefault();
    console.log('dupa');
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
              <InputLabel id='demo-simple-select-label'>Name</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                {fileHeader.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Surname</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                {fileHeader.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                {fileHeader.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                {fileHeader.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>With who</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
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
        <HomeSubPageForm handleClick={handleClick}></HomeSubPageForm>
      </div>
    </>
  );
};

export default Home;
