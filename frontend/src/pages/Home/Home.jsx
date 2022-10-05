/**
 * Created by Pawel on 18.09.2022.
 */

import { Button, LinearProgress, Typography } from '@mui/material';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import * as React from 'react';
import './Home.css';
import HomeTopSection from 'pages/Home/HomeTopSection/HomeTopSection';
import HomeConfirmHeaderForm from 'pages/Home/HomeConfirmHeaderForm/HomeConfirmHeaderForm';
import HomeSubPageForm from 'pages/Home/HomeSubPageForm/HomeSubPageForm';
import HomeBottomSection from 'pages/Home/HomeBottomSection/HomeBottomSection';
import { useState } from 'react';
import HomeCSVTable from './HomeCSVTable/HomeCSVTable';

const Home = () => {
  const [progress, setProgress] = React.useState(66);
  const [csvFile, setCsvFile] = useState();
  const [fileContent, setFileContent] = useState();
  const [fileHeader, setFileHeader] = useState();
  const [confirmedHeader, setConfirmedHeader] = useState();
  const [isHeaderConfirm, setIsHeaderConfirm] = useState();

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

    setTimeout(() => {
      let elmntToView = document.getElementById('csv-wrapper--goto');
      console.log(elmntToView);
      elmntToView.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 100);
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

  const sendDataToParent = (index) => {
    // the callback. Use a better name
    console.log(index);
    //setConfirmedHeader(index);
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
        {/* <div className='progress-bar-section'>
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
        </div> */}

        {/* *******************************************************************/}

        {fileHeader && fileContent && (
          <div className='csv-wrapper' id='csv-wrapper--goto'>
            <h1 className='csv-wrapper__header'>Zmapuj swoje dane</h1>
            <p className='csv-wrapper__subheader'>
              Zrób to w taki sposób aby nazwy placeholderów pokrywały się z tym co pokazuje Ci się w polach po kliknięciu odpowiedniego inputa :D
            </p>
            <HomeConfirmHeaderForm fileHeader={fileHeader} sendDataToParent={sendDataToParent} />
            {isHeaderConfirm && <HomeCSVTable data={fileContent}></HomeCSVTable>}
          </div>
        )}

        {/* *******************************************************************/}
        {fileHeader && confirmedHeader && fileContent && (
          <div className='bottom-section'>
            <Button variant='contained' type='submit'>
              Przydziel automatycznie
            </Button>
            <Button variant='contained' type='submit'>
              Przydziel samodzielnie
            </Button>

            <HomeBottomSection fileContent={fileContent} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
