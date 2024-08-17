import React, { useState, useEffect } from "react";
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
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  isSameMonth,
} from "date-fns";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import "./assesment.css";
import { useDataContext } from "../StudentContext";

// Utility functions for local storage
const saveScoresToLocalStorage = (
  subject: string,
  date: string,
  scores: any
) => {
  const key = `scores_${subject}_${date}`;
  localStorage.setItem(key, JSON.stringify(scores));
};

const loadScoresFromLocalStorage = (subject: string, date: string) => {
  const key = `scores_${subject}_${date}`;
  const scores = localStorage.getItem(key);
  return scores ? JSON.parse(scores) : {};
};

const saveTopicsToLocalStorage = (date: string, topic: string) => {
  const key = `topic_${date}`;
  localStorage.setItem(key, topic);
};

const loadTopicFromLocalStorage = (date: string) => {
  const key = `topic_${date}`;
  return localStorage.getItem(key) || "";
};

const holidays = [new Date(2024, 0, 1), new Date(2024, 6, 4)];

const isHoliday = (date: Date): boolean => {
  return holidays.some((holiday) => isSameDay(date, holiday));
};

const Assessment: React.FC<{ subject: string }> = ({ subject }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editingCell, setEditingCell] = useState<{
    studentIndex: number;
    date: Date;
  } | null>(null);
  const [editingTopicDate, setEditingTopicDate] = useState<Date | null>(null);
  const [studentScores, setStudentScores] = useState<{
    [studentIndex: number]: { [date: string]: string };
  }>({});
  const [topics, setTopics] = useState<{ [date: string]: string }>({});

  const { students } = useDataContext();

  useEffect(() => {
    const date = format(currentMonth, "yyyy-MM");
    const scores = loadScoresFromLocalStorage(subject, date);
    setStudentScores(scores);

    // Load topics for the current month
    const monthTopics = datesInMonth.reduce((acc, date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      acc[formattedDate] = loadTopicFromLocalStorage(formattedDate);
      return acc;
    }, {} as { [date: string]: string });

    setTopics(monthTopics);
  }, [subject, currentMonth]);

  const handlePreviousMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleMonthClick = (month: Date): void => {
    setCurrentMonth(month);
  };

  const handleDoubleClick = (studentIndex: number, date: Date): void => {
    setEditingCell({ studentIndex, date });
  };

  const handleDoubleClickTopic = (date: Date): void => {
    setEditingTopicDate(date);
  };

  const handleEnterDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    studentIndex: number,
    date: Date
  ) => {
    if (e.key === "Enter") {
      handleBlur(studentIndex, date, (e.target as HTMLInputElement).value);
    }
  };

  const handleTopicEnterDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    date: Date
  ) => {
    if (e.key === "Enter") {
      handleTopicBlur(date, (e.target as HTMLInputElement).value);
    }
  };

  const handleBlur = (
    studentIndex: number,
    date: Date,
    value: string
  ): void => {
    const score = Number(value);
    if (score >= 1 && score <= 5) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setStudentScores((prevScores) => {
        const newScores = {
          ...prevScores,
          [studentIndex]: {
            ...prevScores[studentIndex],
            [formattedDate]: value,
          },
        };
        const dateKey = format(currentMonth, "yyyy-MM");
        saveScoresToLocalStorage(subject, dateKey, newScores);
        return newScores;
      });
    }
    setEditingCell(null);
  };

  const handleTopicBlur = (date: Date, value: string): void => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setTopics((prevTopics) => {
      const newTopics = {
        ...prevTopics,
        [formattedDate]: value,
      };
      saveTopicsToLocalStorage(formattedDate, value);
      return newTopics;
    });
    setEditingTopicDate(null);
  };

  const getColorForScore = (score: string) => {
    switch (score) {
      case "5":
        return "green";
      case "4":
        return "yellow";
      case "3":
        return "orange";
      case "2":
        return "red";
      case "1":
        return "red";
      default:
        return "";
    }
  };

  const datesInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  }).filter((date) => getDay(date) !== 0 && !isHoliday(date));

  const monthsInYear = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  return (
    <Box sx={{ padding: 0, paddingX: "0px" }}>
      <Box
        sx={{
          maxHeight: 500,
          overflowY: "scroll",
          padding: "0px",
          paddingX: "0px",
        }}
        className="scrollbar-hidden"
      >
        <div className="date-picker">
          <div className="flex justify-center align-middle content-center"></div>
          <div className="month-picker flex justify-between mx-2 my-3">
            {monthsInYear.map((month) => (
              <button
                key={month.toISOString()}
                className={`month-button ${
                  isSameMonth(currentMonth, month) ? "selected-month" : "unsele"
                }`}
                onClick={() => handleMonthClick(month)}
              >
                {format(month, "MMMM")}
              </button>
            ))}
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
                    <TableCell
                      sx={{ minHeight: "40px" }}
                      onDoubleClick={() => handleDoubleClickTopic(date)}
                      className={`date ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "selectedDateTopic"
                          : ""
                      } `}
                    >
                      {editingTopicDate && isSameDay(editingTopicDate, date) ? (
                        <input
                          type="text"
                          autoFocus
                          onBlur={(e) => handleTopicBlur(date, e.target.value)}
                          onKeyDown={(e) => handleTopicEnterDown(e, date)}
                        />
                      ) : (
                        topics[format(date, "yyyy-MM-dd")] || ""
                      )}
                    </TableCell>
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
                    style={{
                      backgroundColor: getColorForScore(
                        studentScores[studentIndex]?.[
                          format(date, "yyyy-MM-dd")
                        ] || ""
                      ),
                    }}
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
                        onKeyDown={(e) =>
                          handleEnterDown(e, studentIndex, date)
                        }
                      />
                    ) : (
                      studentScores[studentIndex]?.[
                        format(date, "yyyy-MM-dd")
                      ] || ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Assessment;
