import React from 'react';
import spinner from './Spinner.gif';

const spinnerStyle = {
  width: '80px', // Adjust width as needed
  height: '80px', // Adjust height as needed
};

export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={spinner} alt="Loading..." style={spinnerStyle} />
    </div>
  );
}
