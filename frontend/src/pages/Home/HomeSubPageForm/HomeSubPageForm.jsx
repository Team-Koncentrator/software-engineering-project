import React from 'react';

const HomeSubPageForm = ({ handleClick }) => {
  return (
    <>
      <div>
        <button onClick={(event) => handleClick(33)}>w gore</button>
        <button onClick={(event) => handleClick(100)}>w dol</button>
      </div>
    </>
  );
};

export default HomeSubPageForm;
