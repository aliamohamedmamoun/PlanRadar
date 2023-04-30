import React from 'react';
import logo from '../../assets/headerLogo.png';
import './styles.css';

export default function Header() {
  return (
    <header className="prHeader">
      <img src={logo} alt="PlanRadar logo" className="prLogo" />
      <h2>PlanRadar</h2>
    </header>
  );
}
