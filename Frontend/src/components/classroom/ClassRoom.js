import React, { useEffect, useState } from "react";
import "../classroom/classroom.css";
import { useApp } from "../../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditClass from "../modal/EditClass";
import Dashboard from "../dashboard/Dashboard";
import AppProvider from "../../context/AppProvider";
export default function Classroom({ onIndexSelect }) {
  const { classListByTeacherID, setSelectedClassRoomId } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { set}
  const backgroundImages = [
    'https://gstatic.com/classroom/themes/img_backtoschool.jpg',
    'https://gstatic.com/classroom/themes/img_code.jpg',
    'https://gstatic.com/classroom/themes/Honors.jpg',
    'https://gstatic.com/classroom/themes/img_learnlanguage.jpg',
    'https://gstatic.com/classroom/themes/img_bookclub.jpg',
  ];

  const handleItemClick = (index) => {
    onIndexSelect(index);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (classId) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);

  };
  return (
    <div className="class-body">
      <div className="body-content">
        <div className="classroom-list">
          {classListByTeacherID.map((classItem, index) => (
            <div key={classItem._id} className="card" >
              <div
                className="card-content"
                onClick={() => {
                  setSelectedClassRoomId(classItem._id);
                  handleItemClick(index)
                }}
                
                style={{
                  backgroundImage: `url(${backgroundImages[index % backgroundImages.length+1]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="card-classname">{classItem.className}</div>
                <div className="card-description">{classItem.description}</div>
              </div>
              <div className="card-feature">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="icon"
                  style={{color: "black"}}
                  onClick={() => {
                    handleEditClick(classItem._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <EditClass
        isEdit={isModalOpen}
        closeEdit={closeModal}
        editClassId={selectedClassId}
      />
    </div>
  );
}
