import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {FiLogOut} from 'react-icons/fi'

import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const Header = () => (
  <div className="header-container">
    <div className="header-container-sm">
      <div className="header-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-header-sm"
          />
        </Link>
      </div>
      <ul className="header-menu-sm">
        <li className="header-menu-item-sm">
          <Link to="/" className="menu-item-link">
            <AiFillHome className="item-icon" />
          </Link>
        </li>
        <li className="header-menu-item-sm">
          <Link to="/jobs" className="menu-item-link">
            <FaSuitcase className="item-icon" />
          </Link>
        </li>
        <li className="header-menu-item-sm">
          <button className="header-logout-sm" type="button">
            <FiLogOut className="logout-icon" />
          </button>
        </li>
      </ul>
    </div>
    <div className="header-container-lg">
      <div className="header-logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo-header-lg"
        />
      </div>
      <ul className="header-menu-lg">
        <li className="header-menu-item-lg">
          <Link to="/" className="menu-item-link">
            Home
          </Link>
        </li>
        <li className="header-menu-item-lg">
          <Link to="/jobs" className="menu-item-link">
            Jobs
          </Link>
        </li>
        <li className="header-menu-item-lg">
          <button className="header-logout-lg" type="button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
)

export default Header
