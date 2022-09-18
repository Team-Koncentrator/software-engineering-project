import React from 'react';
import './Button.css';

export default function Button(props) {
  const { value, clickHandler, keyDownHandler, type } = props;

  return (
    <div>
      <button className='myButton' onClick={clickHandler} onKeyDown={keyDownHandler} type={type}>
        {value}
      </button>
    </div>
  );
}

Button.defaultProps = {
  type: 'button'
};
