import React, { useState } from "react";
import "../body/body.css";
import Dashboard from "../dashboard/Dashboard";
import Classroom from "../classroom/ClassRoom";
import { useApp } from "../../context/AppProvider";
export default function Body({ isOpen, closeEdit, editClassId }) {
  const { selectedClass } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div className="this-body">
      <div className={`body-overlay ${isOpen ? "open" : ""}`}>
        {selectedClass._id && <Dashboard selectedIndex={selectedIndex}/>}
        {!selectedClass._id && <Classroom onIndexSelect={setSelectedIndex}/>}
      </div>
    </div>
  );
}
