/**
 * Created by Pawel on 18.09.2022.
 */

import { Button, LinearProgress, Typography, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import * as React from 'react';
import './Home.css';
import HomeTopSection from 'pages/Home/HomeTopSection/HomeTopSection';
import HomeConfirmHeaderForm from 'pages/Home/HomeConfirmHeaderForm/HomeConfirmHeaderForm';
import HomeSubPageForm from 'pages/Home/HomeSubPageForm/HomeSubPageForm';
import HomeBottomSection from 'pages/Home/HomeBottomSection/HomeBottomSection';
import { useState } from 'react';

const Home = () => {
  const [progress, setProgress] = React.useState(66);
  const [csvFile, setCsvFile] = useState();
  const [fileContent, setFileContent] = useState();
  const [fileHeader, setFileHeader] = useState();
  const [confirmedHeader, setConfirmedHeader] = useState();

  let fileReader = new FileReader();

  /* *****************************
  handle functions for csv form
  ***************************** */
  const handleOnChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (csvFile) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        let [array, header] = parseCsv(csvOutput);

        setFileContent(array);
        setFileHeader(header);

        console.log(array);
        console.log(header);
      };

      fileReader.readAsText(csvFile);
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
        {/* *******************************************************************/}
        <HomeTopSection
          csvfile={csvFile}
          fileContent={fileContent}
          fileHeader={fileHeader}
          handleOnChange={(e) => handleOnChange(e)}
          handleOnSubmit={(e) => handleOnSubmit(e)}
        />
        {/* *******************************************************************/}
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
          <div>{progress}</div>
          <HomeSubPageForm handleClick={handleClick}></HomeSubPageForm>
        </div>

        {/* *******************************************************************/}

        {fileHeader && fileContent && (
          <div>
            <div>{JSON.stringify(fileContent)}</div>
            <div>{JSON.stringify(fileHeader)}</div>
            <HomeConfirmHeaderForm fileHeader={fileHeader} handleOnSubmitConfirmedHeaders={(e) => handleOnSubmitConfirmedHeaders(e)} />
          </div>
        )}
        {JSON.stringify(confirmedHeader)}

        {/* *******************************************************************/}
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
