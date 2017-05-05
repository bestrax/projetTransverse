import React from 'react';
// import { Link } from 'react-router';

import LoginImg from '../../../images/logo.png';

const NavBarContainer = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#"><img src={LoginImg} alt="logo" /></a>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><a className="active" href="#">Accueil</a></li>
          <li><a href="login.html">Sign in</a></li>
          <li><a href="#">Les assos</a></li>
          {/* <li><a href="#"> <div id="menu">
            <ul>


              <li><a href="#">Notre BDE</a>
                <ul>
                  <li><a href="team.html">Les membres</a></li>
                  <li><a href="#">Horaires du BDE</a></li>
                  <li><a href="#">Projets</a></li>
                  <li><a href="#">Evenements</a></li>
                  <li><a href="#">Planning des assos</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="soiree.html">Soirees</a></li>
                </ul>
              </li>

            </ul>
          </div></a></li> */}
          <li><a href="etudiant.html">Les étudiants</a></li>

        </ul>
      </div>
    </div>
  </nav>
);

export default NavBarContainer;
