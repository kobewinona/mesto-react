import logo from '../images/logo_white.svg';


function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия."/>
    </header>
  );
}

export default Header;