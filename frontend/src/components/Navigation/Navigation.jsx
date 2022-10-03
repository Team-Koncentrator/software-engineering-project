/**
 * Created by Pawel on 18.09.2022.
 */

import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './NavigationElements';
import myLogo from 'images/logo.svg';

const Navigation = () => {
  const menuItems = [
    {
      id: '1',
      label: 'Faq',
      url: 'faq',
      order: '1'
    },
    {
      id: '2',
      label: 'O autorach',
      url: 'authors',
      order: '2'
    },
    {
      id: '3',
      label: 'moje przydziały',
      url: 'allocation',
      order: '3'
    },
    {
      id: '4',
      label: 'Przydziel',
      url: 'assign',
      order: '4'
    },
    // Wartość loginu będzie obsługiwana z poziomu bazy danych na podstawie tego czy ktoś jest zalogowany
    {
      id: '5',
      label: 'Login',
      url: 'login',
      order: '5'
    }
  ];

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
                <NavLink to={item.url}>{item.label}</NavLink>
              </li>
            ))}
        </NavMenu>
      </Nav>
  );
};

export default Navigation;
