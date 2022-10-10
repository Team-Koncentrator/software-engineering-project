/**
 * Created by Pawel on 18.09.2022.
 */

import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavigationElements';
import myLogo from 'images/logo.svg';
import { isLogged } from 'utils/isLogged';
import { useState } from 'react';
import { render } from 'react-dom';

const Navigation = (event) => {
  const logged = isLogged();
  const handleLogout = (event) => {
    localStorage.setItem('isLogged', false);
    window.location.reload(); //for development
  };

  const menuItems = [
    {
      id: '1',
      label: 'Faq',
      url: 'faq',
      order: '1',
      click: ''
    },
    {
      id: '2',
      label: 'O autorach',
      url: 'authors',
      order: '2',
      click: ''
    },
    {
      id: '3',
      label: 'moje przydziały',
      url: 'allocation',
      order: '3',
      click: ''
    },
    {
      id: '4',
      label: 'Przydziel',
      url: 'assign',
      order: '4',
      click: ''
    }
  ];

  // Wartość loginu będzie obsługiwana z poziomu bazy danych na podstawie tego czy ktoś jest zalogowany
  !logged
    ? menuItems.push({
        id: '5',
        label: 'Login',
        url: 'login',
        order: '5',
        click: ''
      })
    : menuItems.push({
        id: '6',
        label: 'Logout',
        url: 'login',
        order: '6',
        click: { handleLogout }
      });

  console.table(menuItems);
  return (
    <Nav>
      <NavLink to='/'>
        <img src={myLogo} alt='logo' />
      </NavLink>
      <Bars />
      <NavMenu>
        {menuItems
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((item) => (
            <li key={item.id}>
              <NavLink to={item.url} onClick={handleLogout}>
                {item.label}
              </NavLink>
              <button onClick={handleLogout}>dupa</button>
            </li>
          ))}
      </NavMenu>
    </Nav>
  );
};

export default Navigation;
