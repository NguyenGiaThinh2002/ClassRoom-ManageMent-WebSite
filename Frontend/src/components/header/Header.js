  import React, { useState } from "react";
  import "./header.css";
  import { useAuth } from "../../context/AuthProvider";
  import { useApp } from "../../context/AppProvider";
  import Modal from "../modal/Modal";
  import AddClassModal from "../modal/AddClass";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import classroom from './classroom.png'
  export default function Header({ onClose }) {
    const { user, } = useAuth();
    const {selectedClass} = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenAddClassModal, setopenAddClassModal] = useState(false)

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openAddClassModal = () =>{
      setopenAddClassModal(true);
    }

    const closeAddClassModal = () =>{
      setopenAddClassModal(false);
    }

    


    return (
      <div> 
      <header className="header">
        <div className="thinh">
        <button className="sidebar-toggle" onClick={onClose}>
          <i className="fas fa-bars"></i>
        </button>
        <div><img src={classroom} alt="" className="classroom-photo"/>
        </div>
        <div className="lop-hoc">
           <h2>Lớp học </h2> 
           {selectedClass.className && <div className="ten-lop-hoc">
            <span></span>
            <h2>&gt; {selectedClass.className}</h2>
            </div>}
        </div>
        </div>

  

        <div className="header-content">
          <nav className="nav">
            <ul className="ul">
              <li>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
              </li>
      
                <div className="add-classroom" >
                    <a href="#" role="button" onClick={openAddClassModal}><FontAwesomeIcon icon={faPlus} /></a>
                </div> 

                <a href="#" role="button" onClick={openModal}>
                  <img className="photo" src={user.photoURL} alt="" />
                </a>
            </ul>
          </nav>
        </div>
      </header>
             <AddClassModal isOpen={isOpenAddClassModal} onClose={closeAddClassModal}/> 
      </div>
    );
  }
