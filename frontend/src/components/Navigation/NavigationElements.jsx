/**
 * Created by Pawel on 18.09.2022.
 */

import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
  background: #1e4d73;
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 0 104px;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  font-size: 15px;
  align-items: center;
  text-decoration: none;
  padding: 0 32px;
  height: 100%;
  cursor: pointer;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-family: 'open-500';

  &.active {
    opacity: 1;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    transform: translate(-100%, 75%);
    font-size: 30px;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-right: -24px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.button`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  color: #fff;
  padding: 10px 22px;
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &.hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
