import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../../services/axios";
import { useApp } from "../../../context/AppProvider";
import { lightFormatters } from "date-fns";
import "./MyQuill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const MyQuillComponent = ({ onClose }) => {
  const [content, setContent] = useState("");
  const { selectedClass, setNotification, handleChilderRender } = useApp();
  const [createdFiles, setCreatedFiles] = useState([]);
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

      const notificationData = {
        content: content,
        classID: selectedClass._id,
        files: createdFiles,
      };
      await axios
        .post(`notification/createNotification`, notificationData)
        .then((response) => {
          console.log("store notification successfully", response.data);
          setNotification((prevNotifications) => [
            ...prevNotifications,
            response.data,
          ]);
          handleChilderRender()
        })
        .catch((error) => {
          console.error("Error creating notification:", error);
        });

      // const UpdatedFiles = await axios.get('/api/getAllFiles')
      // setFiles(UpdatedFiles.data)
    } catch (error) {
      console.error("Error uploading files:", error.message);
    }
    
    setFiles([]);
    setContent("");
    onClose();
  };
  const handleClose = () => {
    setContent("");
    onClose();
  };

  const [files, setFiles] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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
        className="thisisQuill"
      />
      <div className="custom-container-edit">
        <div className="custom-input-edit">
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
        
        <div className="myQuill-button-edit">
          <button
            onClick={handleSave}
            disabled={
              !content.trim() || !content.replace(/<\/?[^>]+(>|$)/g, "").trim()
            }
          >
            Save Content
          </button>
          <button onClick={handleClose} className="close-btn">
            Close
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
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], 
    [{ align: [] }],
    ["clean"], // remove formatting button


    [{ script: "sub" }, { script: "super" }],
    [{ size: ["small", false, "large", "huge"] }], 
    [{ direction: "rtl" }],
    [{ font: [] }],
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
