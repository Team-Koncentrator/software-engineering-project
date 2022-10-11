import { React } from 'react';
import { Typography, Button } from '@mui/material';

let fileReader = new FileReader();

const HomeTopSection = ({ csvFile, setCsvFile, fileContent, setFileContent, fileHeader, setFileHeader }) => {
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

  return (
    <div className='top-section'>
      <div className='wrapper__headers'>
        <div className='headers-section'>
          <h1 className='headers__main-header'>Przydziel uczestników do domków!</h1>
          <div className='headers__horizontal'></div>
          <h2 className='headers__second-header'>Nasza aplikacja ułatwia podział uczestników ze względu na płeć i wiek</h2>
          <p className='headers__content'>
            Spędzasz noce nad logistyką obozów i chcesz przed rozpoczęciem wiedzieć, jak najbardziej optymalnie przydzielić uczestników do domków i
            pokojów? Z naszą aplikacją to staje się dużo prostsze! Przygotuj plik csv, a my zrobimy resztę za ciebie :&#41;
          </p>
        </div>
        <div className='buttons-section'>
          <div className='buttons__file'>
            <Button variant='contained' component='label'>
              Upload File
              <input type='file' hidden onChange={(e) => handleOnChange(e)} accept={'.csv'} />
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
  );
};

export default HomeTopSection;
