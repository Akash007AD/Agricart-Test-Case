import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [menu, setMenu] = useState(props.page);

  const categories = [
    { name: 'Fruits', path: '/categories', listName: 'Fruits' },
    { name: 'Vegetables', path: '/categories', listName: 'Vegetables' },
    { name: 'Spices', path: '/categories', listName: 'Spices' },
    { name: 'Grains', path: '/categories', listName: 'Grains' },
    { name: 'Pulses', path: '/categories', listName: 'Pulses' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} id="logo" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'home' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${menu === 'categories' ? 'active' : ''}`}
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      to={category.path}
                      state={{ categories: category.listName }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'awareness' ? 'active' : ''}`}
                to="/awareness"
              >
                Awareness
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'contact-us' ? 'active' : ''}`}
                to="/contact-us"
              >
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'about-us' ? 'active' : ''}`}
                to="/about-us"
              >
                About us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center navbar-right">
            <img src={assets.search_icon} alt="Search Icon" />
            <div className="navbar-searchicon position-relative ms-3">
              <img src={assets.bag_icon} alt="Bag Icon" />
              <div className="dot"></div>
            </div>
            {/* Sign in dropdown button */}
            <div className="dropdown ms-3">
              <button
                className="btn btn-outline-success dropdown-toggle"
                type="button"
                id="signinDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sign in
              </button>
              <ul className="dropdown-menu" aria-labelledby="signinDropdown">
                <li>
                  <Link className="dropdown-item" to="/login-farmer">
                    Sign in as Farmer
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    Sign in as Customer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
