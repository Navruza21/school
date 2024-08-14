import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { studentsData } from "../pages/data";
import DatePicker from "./calendar";
import { Typography } from "antd";

const topics = [
  { topic: "topic 1" },
  { topic: "topic 2" },
  { topic: "topic 3" },
  { topic: "topic 4" },
  { topic: "topic 5" },
  { topic: "topic 6" },
  { topic: "topic 7" },
  { topic: "topic 8" },
  { topic: "topic 9" },
  { topic: "topic 10" },
];

interface AssessmentData {
  [date: string]: string;
}

interface StudentAssessments {
  [topicIndex: number]: AssessmentData;
}

const Assessment: React.FC = () => {
  const [assessments, setAssessments] = useState<StudentAssessments[]>(
    studentsData.map(() => topics.map(() => ({} as AssessmentData)))
  );
  const [editingCell, setEditingCell] = useState<{
    row: number | null;
    col: number | null;
  }>({
    row: null,
    col: null,
  });
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const handleDoubleClick = (rowIndex: number, colIndex: number) => {
    setEditingCell({ row: rowIndex, col: colIndex });
    const currentAssessment =
      assessments[rowIndex][selectedTopic][selectedDate.toDateString()];
    setInputValue(currentAssessment || "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (editingCell.row !== null && editingCell.col !== null) {
      const newAssessments = [...assessments];
      if (
        !newAssessments[editingCell.row][selectedTopic][
          selectedDate.toDateString()
        ]
      ) {
        newAssessments[editingCell.row][selectedTopic][
          selectedDate.toDateString()
        ] = "";
      }
      newAssessments[editingCell.row][selectedTopic][
        selectedDate.toDateString()
      ] = inputValue;
      setAssessments(newAssessments);
      setEditingCell({ row: null, col: null });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <Box>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            select
            label="Select Topic"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(Number(e.target.value))}
            SelectProps={{
              native: true,
            }}
          >
            {topics.map((topic, index) => (
              <option key={index} value={index}>
                {topic.topic}
              </option>
            ))}
          </TextField>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student: any, studentIndex: any) => (
                <TableRow key={studentIndex}>
                  <TableCell>{studentIndex + 1}</TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() =>
                      handleDoubleClick(studentIndex, selectedTopic)
                    }
                  >
                    {editingCell.row === studentIndex &&
                    editingCell.col === selectedTopic ? (
                      <input
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      assessments[studentIndex][selectedTopic][
                        selectedDate.toDateString()
                      ] || ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Assessment;
