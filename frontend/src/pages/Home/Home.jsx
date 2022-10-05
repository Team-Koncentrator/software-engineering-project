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
  const [isHeaderConfirm, setIsHeaderConfirm] = useState(false);
  const [houses, setHouses] = useState([
    {
      id: Math.random() * 0.8 + Math.PI,
      houseName: 'Domek 1',
      rooms: [
        { id: Math.random() * 0.8 + Math.PI, name: 'Pokój 1', people: '3' },
        { id: Math.random() * 0.8 + Math.PI, name: 'Pokój 2', people: '3' }
      ]
    }
  ]);

  return (
    <>
      <div className='main-wrapper'>
        {/* *******************************************************************/}
        <HomeTopSection
          csvFile={csvFile}
          setCsvFile={setCsvFile}
          fileContent={fileContent}
          setFileContent={setFileContent}
          fileHeader={fileHeader}
          setFileHeader={setFileHeader}
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
            <h1 className='csv-wrapper__header'>Krok 2. Zmapuj swoje dane</h1>
            <p className='csv-wrapper__subheader'>
              Zrób to w taki sposób aby nazwy placeholderów pokrywały się z tym co pokazuje Ci się w polach po kliknięciu odpowiedniego inputa :D
            </p>
            <HomeConfirmHeaderForm fileHeader={fileHeader} isHeaderConfirm={isHeaderConfirm} setIsHeaderConfirm={setIsHeaderConfirm} />
            {/* {isHeaderConfirm && <HomeCSVTable data={fileContent}></HomeCSVTable>} */}
          </div>
        )}

        {/* ****************************************************************** */}

        {isHeaderConfirm && (
          <div className='home-bootom-wrapper' id='home-bootom-wrapper--goto'>
            <h1 className='bottom-wrapper__header'>Krok 3. Wybierz na ile domków oraz pokoi chcecie się podzielić ;&#41;</h1>
            <HomeBottomSection houses={houses} setHouses={setHouses} fileContent={fileContent} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
