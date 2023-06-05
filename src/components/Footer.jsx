import {memo} from 'react';

const Footer = memo(() => {
  console.log('footer is rendered');
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2023 Климкин Дима</p>
    </footer>
  );
});

export default Footer;