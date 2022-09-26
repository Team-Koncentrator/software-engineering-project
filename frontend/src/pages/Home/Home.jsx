/**
 * Created by Pawel on 18.09.2022.
 */

//import Button from 'components/Button/Button';
import { Button, LinearProgress, Box, Typography } from '@mui/material';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import * as React from 'react';
import './Home.css';
import HomeSubPageForm from 'pages/HomeSubPageForm/HomeSubPageForm';
import axios from 'axios';

const Home = () => {
  const [progress, setProgress] = React.useState(66);

  const handleClick = (num) => {
    // 👇️ take parameter passed from Child component
    setProgress(() => num);
  };

  const handleCsvSubmit = async (event) => {
    const csvForm = document.getElementById('csvForm');

    event.preventDefault();
    const formData = new FormData(csvForm);
    console.log([...formData]);

    try {
      const response = await axios.post('http://127.0.0.1:3001/users/create', formData); // HARDCODED URL
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
                i pokojów? Z naszą aplikacją to staje się dużo prostsze! Przygotuj plik xml, a my zrobimy resztę za ciebie :&#41;
              </p>
            </div>
            <div className='buttons-section'>
              <form id='csvForm' onSubmit={handleCsvSubmit}>
                <div className='buttons__file'>
                  <input name='csvFile' accept='text/csv' style={{ display: 'none' }} id='raised-button-file' multiple type='file' />
                  <label htmlFor='raised-button-file'>
                    <Button variant='outlined' component='span'>
                      Upload
                    </Button>
                  </label>
                </div>
                <Typography variant='caption' sx={{ alignSelf: 'center' }}>
                  Wymagany format pliku to .<strong>CSV</strong>
                </Typography>
                <div className='buttons__next'>
                  <Button variant='contained' type='submit'>
                    ROZPOCZNIJ
                  </Button>
                </div>
              </form>
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
        <HomeSubPageForm handleClick={handleClick}></HomeSubPageForm>
      </div>
    </>
  );
};

export default Home;
