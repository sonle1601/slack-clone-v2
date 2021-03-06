import React from 'react';
import './Header.css';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Brightness1RoundedIcon from '@material-ui/icons/Brightness1Rounded';
import SimpleDialogDemo from './UserDetail';

function Header() {
  return (
    <div className='header'>
      <div className='header__info'>
        <AccessTimeIcon className='header__icon' />
        <form action='submit' className='header__search'>
          <input
            type='text'
            className='header__search-input'
            placeholder='Search'
          />
        </form>
        <HelpOutlineIcon className='header__icon' />
      </div>
      <div className='header__user'>
        <Brightness1RoundedIcon className='header__icon-circle' />
        <SimpleDialogDemo />
      </div>
    </div>
  );
}

export default Header;
