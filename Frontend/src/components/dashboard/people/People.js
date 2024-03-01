import React, { useState } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InviteModal from "./modal/Invite";
import { useApp } from "../../../context/AppProvider";
import "../people/people.css";
export default function People() {
  const { studentList, loginnedUserId } = useApp();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log(studentList);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="people-container">
      <div className="giao-vien">
        <div className="them-hoc-sinh">
          <div className="text">Giáo Viên</div>
          <div></div>
        </div>
        <div className="giao-vien-info">
          <img
            className="avatar"
            src={loginnedUserId.photoURL}
            alt="User Avatar"
          />
          <div className="name"> {loginnedUserId.username} </div>
        </div>
      </div>

      <div className="hoc-sinh">
        <div className="them-hoc-sinh">
          <div className="text">Học Sinh</div>
          <div>
            <a>{studentList.length} học sinh</a>
          <button
            onClick={handleOpenModal}
            style={{
              color: "rgb(25,103,210)",
              backgroundColor: "white",
              fontSize: "20px",
              
            }}
          >
            {/* <FontAwesomeIcon icon={faPlus} />
          Thêm Học Sinh */}
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          {isModalOpen && <InviteModal onClose={handleCloseModal} />}
          </div>
        </div>
        {studentList &&
          studentList.map((student) => (
            <div className="hoc-sinh-list" key={student._id}>
              <img
                className="avatar"
                src={student.photoURL}
                alt="User Avatar"
              />
              <div className="name"> {student.username}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
