/**
 * Created by Pawel on 18.09.2022.
 */

import Button from 'components/Button/Button';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='wrapper__left'>
          <div className='left__headers'>
            <h1 className='headers__main-header'>Przydziel uczestników do domków!</h1>
            <div className='headers__horizontal'></div>
            <h2 className='headers__second-header'>Nasza aplikacja ułatwia podział uczestników ze względu na płeć i wiek</h2>
            <p className='headers__content'>
              Spędzasz noce nad logistyką obozów i chcesz przed rozpoczęciem wiedzieć, jak najbardziej optymalnie przydzielić uczestników do domków i
              pokojów? Z naszą aplikacją to staje się dużo prostrze! Przygotuj plik xml, a my zrobimy resztę za ciebie :&#41;
            </p>
          </div>
          <div className='left__files'>
            <div className='files__button-container'>
              <Button value='wybierz plik'></Button>
            </div>
            <span className='files__text-xml'>
              Wymagany format pliku to .<b>XML</b>
            </span>
            <div className='files__button-container'>
              <Button value='ROZPOCZNIJ'></Button>
            </div>
            <span className='files__text-enter'>
              naciśnij <b>Enter</b>
            </span>
          </div>
        </div>
        <div className='wrapper__right'>
          <img src={require('images/mainImg.png')} alt='obrazek' className='right__img' />
        </div>
      </div>
    </>
  );
};

export default Home;
