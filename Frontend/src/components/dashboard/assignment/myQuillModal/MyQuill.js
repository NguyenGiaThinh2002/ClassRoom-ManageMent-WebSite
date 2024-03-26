import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../../../services/axios";
import { useApp } from "../../../../context/AppProvider";
import { lightFormatters } from "date-fns";
import "./myquill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const MyQuillComponent = ({ onClose , allInfo , isEdit}) => {
  const [content, setContent] = useState("");
  const { selectedClass, setNotification } = useApp();
  const [createdFiles, setCreatedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  if(isEdit){
    // setContent(editContent);
    console.log(allInfo.editContent);
  }
  const handleEditorChange = (value) => {
    setContent(value);
  };
  const handleSave = async () => {
    // console.log("Content:", content);
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("pdf", file);
      }

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPdfUrls(response.data.pdfUrls);

      const Originalname = await response.data.Originalname;
      const path = await response.data.pdfUrls;
      for (const [index, name] of Originalname.entries()) {
        const filesData = {
          originalName: name,
          path: path[index],
        };
        const uploadedFiles = await axios.post("api/createFiles", filesData);
        createdFiles.push(uploadedFiles.data._id);
      }

      const dueDay = new Date(`${allInfo.selectedDate} ${allInfo.selectedTime}`);
      // console.log("this is dueDay",dueDay);

      const notificationData = {
        content: content,
        files: createdFiles,
        dueDay: dueDay,
        classID: allInfo.classID,
        title: allInfo.title,
        submitLatePermission: allInfo.submitLatePermission,
        grade: allInfo.grade
      };


      console.log("save content successfully", notificationData);
      axios
        .post(`assignment/createAssignment`, notificationData)
        .then((response) => {
          console.log("store notification successfully", response.data);
          // setNotification((prevNotifications) => [
          //   ...prevNotifications,
          //   response.data,
          // ]);
        })
        .catch((error) => {
          console.error("Error creating notification:", error);
        });
    } catch (error) {
      console.error("Error uploading files:", error.message);
    }
    setFiles([]);
    setContent("");
    onClose();
  };
  const handleClose = () => {
    setContent("");
    console.log(allInfo);
    onClose();
  };



  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(files);
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        modules={MyQuillComponent.modules}
        formats={MyQuillComponent.formats}
        className="assignment-Quill"
        placeholder="Nội Dung"
      />
      <div className="custom-container">
        <div className="custom-input">

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="custom-file-input"
            id="customFile" // Make sure this matches the label's "for" attribute
          />
          <label className="custom-file-label" htmlFor="customFile">
            <FontAwesomeIcon icon={faUpload} className="mr-2"/>
          </label>
          
          <div>
          {selectedFiles.length > 0 &&
            // <span className="selected-files">{selectedFiles.join('    ')}</span>
            selectedFiles.map((file) => <div key={file}>{file}</div>)}
          </div>
        </div>
        
        <div className="myQuill-button">
          <button
            onClick={handleSave}
            disabled={
              !content.trim() || !content.replace(/<\/?[^>]+(>|$)/g, "").trim()
            }
          >
            Đăng Bài
          </button>
          <button onClick={handleClose} className="close-btn">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

MyQuillComponent.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }], 
    // [{ direction: "rtl" }],
    // [{ size: ["small", false, "large", "huge"] }], 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], 
    // [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
};

MyQuillComponent.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "color",
  "background",
  "align",
];

export default MyQuillComponent;
