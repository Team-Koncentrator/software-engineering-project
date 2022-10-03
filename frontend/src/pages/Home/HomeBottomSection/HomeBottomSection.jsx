import React from 'react';
import './HomeBottomSection.css';
import { TextField } from '@mui/material';

const HomeBottomSection = ({ fileContent }) => {
  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className='home_bottom_section'>
      HomeBottomSection
      {console.log(fileContent.length)}
      <form>
        {/* inputProps={{ inputMode: 'number', pattern: '[1-9]*' }} */}
        Ile domków? <TextField id='standard-basic' variant='standard' type='number' pattern='[1-9]*' onChange={onChange} />
        Ile pokoi
      </form>
    </div>
  );
};

export default HomeBottomSection;
