import React from 'react';
import './Input.css';

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className='input-wrapper'>
    {label && (
      <label className='label-input' htmlFor='input-field'>
        {label}
      </label>
    )}
    <input type={type} value={value} name={name} className='myInput' placeholder={placeholder} onChange={onChange} />
  </div>
);

export default InputField;
