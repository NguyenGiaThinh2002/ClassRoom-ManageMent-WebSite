import React, { useState } from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faChalkboard, faCog } from "@fortawesome/free-solid-svg-icons";
import { useApp } from '../../context/AppProvider';

// tao repos tren github MSSV, Hoten, Frontend(Backend), nao thay gui thi nop
export default function SideBar({ isOpen, onClose }) {
  const {setClassEmpty, handleSetOpenStoringClasses, handleSetCloseStoringClasses} = useApp();

  return (
    // onMouseOver={isOpen ? onClose : undefined} onMouseOut={isOpen ? onClose : undefined}
    <div className={`sidebar ${isOpen ? 'open' : ''}`}  >
      <div className="sidebar-header">
      </div>
      <div className="sidebar-content">
        <ul className="nav-links">
          <li >
            <Link to="#"   onClick={() => { setClassEmpty(); handleSetCloseStoringClasses(); }} >
            <FontAwesomeIcon icon={faHome} className='icon'/>
            {/* { !isOpen && <div>Màn hình chính</div> } */}
            <div className='sidebar-text' >Màn hình chính</div>
            </Link>
          </li>
          <li >
            <Link to="#" onClick={handleSetOpenStoringClasses}>
            <FontAwesomeIcon icon={faChalkboard} className='icon' />
            <div className='sidebar-text'>Lớp Học</div>
            {/* { !isOpen && <div><FontAwesomeIcon icon={faChalkboard} className='icon'/>Lớp Học</div> } */}
            </Link>
          </li>

          <li>
            <Link to="#" >
            <FontAwesomeIcon icon={faCog} className='icon'/>
            <div className='sidebar-text'>Cài đặt</div>
            {/* { !isOpen && <div><FontAwesomeIcon icon={faCog} className='icon'/>Cài đặt</div> } */}
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </div>
  )
}
