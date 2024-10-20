import React from 'react';
import logo from '../assest/logo.png';
const Logo = ({ w, h }) => {
  return (
    <div>
      <img width={w} height={h} src={logo} alt='logo' className='rounded-full'/>
    </div>
  );
}

export default Logo;
