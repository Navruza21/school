import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
  isSameDay,
  getDay,
} from "date-fns";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import "./assesment.css";
import { useDataContext } from "../StudentContext";

const holidays = [new Date(2024, 0, 1), new Date(2024, 6, 4)];

const isHoliday = (date: Date): boolean => {
  return holidays.some((holiday) => isSameDay(date, holiday));
};

const Assessment: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editingCell, setEditingCell] = useState<{
    studentIndex: number;
    date: Date;
  } | null>(null);
  const [studentScores, setStudentScores] = useState<{
    [studentIndex: number]: { [date: string]: string };
  }>({});

  const { students } = useDataContext();

  const handlePreviousMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleDoubleClick = (studentIndex: number, date: Date): void => {
    setEditingCell({ studentIndex, date });
  };

  const handleBlur = (
    studentIndex: number,
    date: Date,
    value: string
  ): void => {
    setStudentScores((prevScores) => ({
      ...prevScores,
      [studentIndex]: {
        ...prevScores[studentIndex],
        [date.toISOString()]: value,
      },
    }));
    setEditingCell(null);
  };

  const datesInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  }).filter((date) => getDay(date) !== 0 && !isHoliday(date));

  return (
    <Box sx={{ padding: 0 }}>
      <TableContainer
        sx={{
          maxHeight: 500,
          overflowY: "scroll",
        }}
        className="scrollbar-hidden"
      >
        <div className="date-picker">
          <div className="flex justify-center align-middle content-center">
            <div className="header w-[140px]">
              <button onClick={handlePreviousMonth}>
                <FaRegArrowAltCircleLeft />
              </button>
              <span className="w-[200px]">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button onClick={handleNextMonth}>
                <FaRegArrowAltCircleRight />
              </button>
            </div>
          </div>
        </div>
        <Table>
          <TableHead
            sx={{
              paddingX: "20px",
              position: "sticky",
              top: 0,
              bgcolor: "#dce2ef",
            }}
          >
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Full Name</TableCell>
              {datesInMonth.map((date) => (
                <TableCell key={date.toISOString()} sx={{ minWidth: "70px" }}>
                  <div className="flex justify-center content-center flex-col">
                    <p
                      className={`date ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "selected"
                          : ""
                      }  `}
                      onClick={() => handleDateClick(date)}
                    >
                      {format(date, "d")}
                    </p>
                    <p
                      className={`date ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "selectedDateTopic"
                          : ""
                      } `}
                    >
                      tematematema thfghfkyfjfyrfema
                    </p>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            className="tbodyAsses"
            sx={{ height: "450px", overflowY: "scroll" }}
          >
            {students.map((student, studentIndex) => (
              <TableRow key={studentIndex}>
                <TableCell>{studentIndex + 1}</TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                {datesInMonth.map((date) => (
                  <TableCell
                    key={date.toISOString()}
                    onDoubleClick={() => handleDoubleClick(studentIndex, date)}
                  >
                    {editingCell &&
                    editingCell.studentIndex === studentIndex &&
                    isSameDay(editingCell.date, date) ? (
                      <input
                        type="text"
                        autoFocus
                        onBlur={(e) =>
                          handleBlur(studentIndex, date, e.target.value)
                        }
                      />
                    ) : (
                      studentScores[studentIndex]?.[date.toISOString()] || ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Assessment;
