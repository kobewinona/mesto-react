import {memo} from 'react';

import logo from '../images/logo_white.svg';


const Header = memo(() => {
  console.log('header is rendered');
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия."/>
    </header>
  );
});

export default Header;