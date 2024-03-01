import React, { useState } from "react";
import "../modal/addClass.css";
import axios from "../../services/axios";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppProvider";
export default function AddClass({ isOpen, onClose }) {
  const {user} = useAuth()
  const {loginnedUserId, setClassList} = useApp();

  const UserEmail = user.email;
  // console.log(loginUserId);
  const [formData, setFormData] = useState({
    // Khai báo các trường dữ liệu trong form
    className: "",
    classCode: "",
    description: "",
  });
  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      teacherID: loginnedUserId,
    });
  };
  

   const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu formData lên backend thông qua Axios
     axios
      .post("class/createClass", formData)
      .then((response) => {
        // console.log("User successfully stored in MongoDB:", response.data);
        setFormData({
            className: "",
            classCode: "",
            description: "",
            teacherID: loginnedUserId,
          });
        //  window.location.reload();
        console.log("this is new class", response.data);
        setClassList((prevClasses) => [...prevClasses, response.data]);

        onClose()
      })
      .catch((error) => {
        console.error("Error storing user in MongoDB:", error);
      });
  }
  return (
    <div className="addClass-modal-overlay">
      <div
        className="addClass-model-content"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="addClass-form" onSubmit={handleSubmit}>
          <h3 style={{ color: "white"}}>Thêm Lớp</h3>
          {/* <h4 style={{ color: "white"}}></h4> */}
          <label className="addClass-item">
            Tên lớp:
            <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
            />
          </label>

          <label className="addClass-item">
            Mã lớp:
            <input
              type="text"
              name="classCode"
              value={formData.classCode}
              onChange={handleChange}
            />
          </label>
          <label className="addClass-item">
            Mô tả:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <div>
            <input type="submit" value="Submit" />
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
