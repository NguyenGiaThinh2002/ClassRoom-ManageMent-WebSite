import React, { useState, useEffect, useMemo } from "react";
import { useApp } from "../../../context/AppProvider";
import MyQuill from "./MyQuillEditor";
import "./main.css";
import axios from "../../../services/axios";
import pdf from "../../../asset/pdf.png";
import word from "../../../asset/word.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import EditNotificationModal from "../main/notificationModal/NotificationModal";
export default function Main({
  isOpen,
  onClose,
  notificationId,
  selectedIndex,
  
}) {
  const {
    selectedClass,
    notificationByClassId,
    loginnedUserId,
    files,
    setNotification,
  } = useApp();
  const [notification, setThisNotification] = useState(false);

  const handleOpenNoti = (e) => {
    setThisNotification(true);
  };

  const handleCloseNoti = (e) => {
    setThisNotification(false);
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const backgroundImages = [
    "https://gstatic.com/classroom/themes/img_backtoschool.jpg",
    "https://gstatic.com/classroom/themes/img_code.jpg",
    "https://gstatic.com/classroom/themes/Honors.jpg",
    "https://gstatic.com/classroom/themes/img_learnlanguage.jpg",
    "https://gstatic.com/classroom/themes/img_bookclub.jpg",
  ];

  // const formatDate = (timestamp) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  //   return new Date(timestamp).toLocaleString('en-US', options);
  // };
  const formatDate = (timestamp) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const getFileInfo = (fileID) => {
    try {
      const thisFile = files.find((file) => file._id === fileID);
      const filename = thisFile.originalName;
      const path = thisFile.path;
      return { filename, path };
    } catch (error) {
      console.log("Cannot get Files", error);
    }
  };
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsId, setShowOptionsId] = useState(null);

  // setApiPath('notification/createNotification')
  
  // This function toggles the visibility of the options
  const toggleOptions = (notificationId) => {
    setShowOptionsId((currentShowOptionsId) =>
      currentShowOptionsId === notificationId ? null : notificationId
    );
    setShowOptions(!showOptions);
  };

  const handleEditClick = (notificationId) => {
    setSelectedNotificationId(notificationId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const editNotificationById = (notificationId) => {
    console.log(`Editing notification with ID: ${notificationId}`);
    setSelectedNotificationId(notificationId);
    setEditModalOpen(true);
  };

  const deleteNotificationById = async (notificationId) => {
    console.log(`Deleting notification with ID: ${notificationId}`);
    await axios.post(`notification/deleteNotification/${notificationId}`);
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification._id !== notificationId
      )
    );

    // window.location.reload();
    // setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <div className="container">
      <div className="main-dashboard">
        <div
          className="head-content"
          style={{
            backgroundImage: `url(${
              backgroundImages[selectedIndex % backgroundImages.length+1]
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>{selectedClass.className}</div>
          <div>{selectedClass.description}</div>
        </div>

        <div className="notification-classCode">
          <div className="classCode-classChat">
            <div className="classCode-container">
              <div>
                Mã lớp
                <div className="classCode"> {selectedClass.classCode}</div>
              </div>
            </div>

            <div className="classChat-container">Nhóm Chat</div>
          </div>

          <div className="notification-content">
            <div className="create-Notification">
              <div
                className="create-Notification-info"
                onClick={handleOpenNoti}
              >
                {!notification && (
                  <>
                    <img
                      className="avatar"
                      src={loginnedUserId.photoURL}
                      alt="User Avatar"
                    />
                    <div className="notification">
                      Thông báo nội dung nào đó cho lớp của bạn
                    </div>
                  </>
                )}
              </div>
              {notification && (
                <div>
                  <MyQuill onClose={handleCloseNoti} />
                </div>
              )}
            </div>

            <div className="notification-box">
              {notificationByClassId
                .slice()
                .reverse()
                .map((notification) => (
                  <div key={notification._id} className="notification-card">
                    <div className="notification-content-inside">
                      <div className="user-info">
                        <img
                          className="avatar"
                          src={loginnedUserId.photoURL}
                          alt="User Avatar"
                        />

                        <div className="header-notification">
                          <div className="nameAndTime">
                            <a className="username">
                              {loginnedUserId.username}
                            </a>
                            <a>{formatDate(notification.createdAt)}</a>
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <button
                              onClick={() => toggleOptions(notification._id)}
                              className="icon-button"
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {showOptionsId === notification._id && (
                              <div className="options-menu">
                                <ul className="menu-list">
                                  <li>
                                    <button
                                      onClick={() =>
                                        editNotificationById(showOptionsId)
                                      }
                                      className="menu-option"
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  {selectedNotificationId && (
                                    <EditNotificationModal
                                      isOpen={isEditModalOpen}
                                      notificationId={selectedNotificationId}
                                      onClose={handleEditModalClose}
                                    />
                                  )}
                                  <li>
                                    <button
                                      onClick={() =>
                                        deleteNotificationById(showOptionsId)
                                      }
                                      className="menu-option"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <div />
                        <div className="notification-text">
                          <p
                            className="user-content"
                            dangerouslySetInnerHTML={{
                              __html: notification.content,
                            }}
                          ></p>
                        </div>

                        <div className="file-content">
                          {notification.files.map((fileID, index) => {
                            const fileInfo = getFileInfo(fileID);
                            if (fileInfo) {
                              const { filename, path } = fileInfo;
                              const isPdf = filename
                                .toLowerCase()
                                .endsWith(".pdf");
                              const isDocx = filename
                                .toLowerCase()
                                .endsWith(".docx");
                              const isImage = filename
                                .toLowerCase()
                                .endsWith(".png");

                              // Choose the appropriate image based on the file extension
                              const iconSrc = isPdf
                                ? pdf
                                : isDocx
                                ? word
                                : isImage
                                ? path
                                : null;
                              return (
                                <div className="file-container" key={fileID}>
                                  <div className="files">
                                    <a
                                      href={path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={index}
                                    > 
                                      <div className="file-content-inside">
                                        <img
                                          src={iconSrc}
                                          alt={
                                            isPdf
                                              ? "PDF"
                                              : isDocx
                                              ? "DOCX"
                                              : "File"
                                          }
                                          className="file-icon"
                                        />
                                        <span className="filename">
                                          {filename}
                                        </span>
                                      </div>
                                   
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                            return null; // or handle the case when fileInfo is not available
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
