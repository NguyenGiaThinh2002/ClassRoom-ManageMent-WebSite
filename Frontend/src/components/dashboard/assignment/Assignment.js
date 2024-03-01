import React, { useState } from "react";
import AssignModal from "./modal/AssignModal";
import "./assignment.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Assignment() {
  const [OpenModal, SetOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [checked, setChecked] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = React.useState([]);

  const handleChangeMutipleCheckBox = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const AssignmentModal = () => {
    SetOpenModal(!OpenModal);
  };
  return (
    <div className="assignment-container">
      <div>
        {!OpenModal && (
          <div>
            <div>
              <button
                className="add-assignment-button"
                onClick={AssignmentModal}
              >
                + Tạo Bài Tập
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="open-modal-myquill">
        {OpenModal && (
          <div>
            <div className="all-assigment-info">
              <div className="assignmentModal-info">
                <TextField
                  id="outlined-basic"
                  label="Chủ đề"
                  variant="outlined"
                  className="assignTitle"
                />
                <div className="assignmentModal">
                  <AssignModal onCloseModal={AssignmentModal} />
                </div>
              </div>
              <div className="assignment-other-info">
                <div className="assignment-other-info-items">
                  <div className="assignment-info-name">Dành Cho</div>
                  
                  <FormControl sx={{ m: 1, width: 300,  }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Lớp học
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChangeMutipleCheckBox}
                      input={<OutlinedInput label="Lớp học" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="assignment-other-info-items">
                  <div className="assignment-info-name">Điểm</div>
                  <div>
                    <TextField
                      id="filled-number"
                      sx={{ m: 1,}}
                      label="Số điểm"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      className="diem-so"
                    />
                  </div>
                </div>
                <div className="assignment-other-info-items">
                  <div className="assignment-info-name">Hạn Nộp</div>
                  <div className="text-field">
                    <div className="text-field-items">
                      <TextField
                      sx={{ m: 1, marginLeft: 0}}
                        id="date"
                        label="Ngày Tháng"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="han-nop"
                      />
                    </div>
                    <div className="text-field-items">
                      <TextField
                        sx={{ m: 1,}}
                        id="time"
                        label="Thời Gian"
                        type="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min step, can be changed as needed
                        }}
                        className="han-nop"
                      />
                    </div>
                  </div>
                </div>
                <div className="assignment-other-info-items">
                  <FormControlLabel
                   
                    control={
                      <Checkbox
                      sx={{ m: 1,}}
                        checked={checked}
                        onChange={handleChange}
                        name="checkedInput"
                        color="primary"
                      />
                    }
                    label="Đóng tính năng nộp bài sau ngày đến hạn "
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
