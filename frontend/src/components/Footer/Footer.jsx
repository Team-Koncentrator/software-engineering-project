import React from 'react';
import './Footer.css';
import { NavLink as Link } from 'react-router-dom';

const Footer = () => {
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
    <footer className='footer-section'>
      <div className='copyright-area'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 text-center text-lg-left'>
              <div className='copyright-text'>
                <p>
                  Copyright &copy; 2022 <a href='https://github.com/Team-Koncentrator/'>Team Koncentrator</a>
                </p>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 d-none d-lg-block text-right'>
              <div className='footer-menu'>
                <ul>
                  {menuItems
                    .sort((a, b) => Number(a.order) - Number(b.order))
                    .map((item) => (
                      <li key={item.id}>
                        <Link to={item.url}>{item.label}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
