import React, { useState } from "react";
import "../classroom/classroom.css";
import { useApp } from "../../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import EditClass from "../modal/editClass/EditClass";
import StoreClass from "../modal/storeClass/StoreClass";
import RestoreClass from "../modal/restoreClass/RestoreClass";

export default function Classroom({ onIndexSelect }) {
  const { classListByTeacherID, setSelectedClassRoomId, loginnedUserId, classListOfStudent, openStoringClasses,storedClasses, findPerson } =
    useApp();
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoreClassModalOpen, setIsStoreClassModalOpen] = useState(false);
  // const [shownClassList, setShownClassList] = useState([]);
  // const { set}
  const backgroundImages = [
    "https://gstatic.com/classroom/themes/img_backtoschool.jpg",
    "https://gstatic.com/classroom/themes/img_code.jpg",
    "https://gstatic.com/classroom/themes/Honors.jpg",
    "https://gstatic.com/classroom/themes/img_learnlanguage.jpg",
    "https://gstatic.com/classroom/themes/img_bookclub.jpg",
  ];

  const handleItemClick = (index, classID) => {
    onIndexSelect(index);
    setSelectedClassId(classID);
    setIsStoreClassModalOpen(true);
 
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeStoreModal = () => {
    setIsStoreClassModalOpen(false);
  };

  const handleEditClick = (classId) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };
  const handleStoreClick = (classId) => {
    setSelectedClassId(classId);
    setIsStoreClassModalOpen(true);
  };

  if(loginnedUserId.role === 'teacher' && !openStoringClasses) {
    var shownClassList = classListByTeacherID;
  }else if(loginnedUserId.role === 'student'){
    var shownClassList = classListOfStudent;
  }

  if(loginnedUserId.role === 'teacher' && openStoringClasses){
    var shownClassList = storedClasses;
  }

  return (
    <div className="class-body">
      <div className="body-content">
        <div className="classroom-list">
          {shownClassList?.map((classItem, index) => {
            // Find the teacher outside of JSX
            // const teacher = allUser.find((user) => user._id === classItem.teacherID);
            const teacher = findPerson(classItem.teacherID)
            return (
              <div key={classItem._id} className="card">
                <div
                  className="card-content"
                  onClick={() => {
                    setSelectedClassRoomId(classItem._id);
                    handleItemClick(index, classItem);
                  }}
                  style={{
                    backgroundImage: `url(${
                      backgroundImages[index % backgroundImages.length]
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="card-classname">{classItem.className}</div>
                  {
                    loginnedUserId.role === 'teacher' &&
                    <div className="card-description">{classItem.description}</div>
                  }
                  {
                    // Render the teacher's username if it's found
                    loginnedUserId.role === 'student' && teacher && (
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div className="card-description">{teacher.username}</div>
                      <div><img src={teacher.photoURL} alt="" style={{width:"70px", borderRadius: "50px"}}></img></div>
                      </div>
                    )
                  }
                </div>
                {loginnedUserId.role === "teacher" && !openStoringClasses &&  (
                  <div className="card-feature">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="class-icon"
                      style={{ color: "black" }}
                      onClick={() => {
                        handleEditClick(classItem._id);
                      }}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        handleStoreClick(classItem);
                      }}
                      className="class-icon"
                      icon={faTimes}
                      style={{ color: "black" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <EditClass
        isEdit={isModalOpen}
        closeEdit={closeModal}
        editClassId={selectedClassId}
      />
        {!openStoringClasses &&       <StoreClass
        isEdit={isStoreClassModalOpen}
        closeEdit={closeStoreModal}
        editClassId={selectedClassId}
      />}
      {openStoringClasses && <RestoreClass isEdit={isStoreClassModalOpen}
        closeEdit={closeStoreModal}
        editClassId={selectedClassId}/>}

    </div>
  );
  
}
