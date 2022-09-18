import React from 'react';
import './Button.css';

export default function Button({ name }) {
  return (
    <div>
      <button className='myButton'>{name}</button>
    </div>
  );
}
