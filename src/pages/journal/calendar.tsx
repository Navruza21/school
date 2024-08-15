import React, { useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  getDay,
} from "date-fns";
import { Box } from "@mui/material";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import "./data.css";

const holidays = [new Date(2024, 0, 1), new Date(2024, 6, 4)];

const isHoliday = (date: Date): boolean => {
  return holidays.some((holiday) => isSameDay(date, holiday));
};

interface DatePickerProps {
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handlePreviousMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
  };

  const renderDates = (): JSX.Element[] => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    return dates
      .filter((date) => getDay(date) !== 0 && !isHoliday(date))
      .map((date) => (
        <Box
          key={date.toISOString()}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className={`date ${
              selectedDate && isSameDay(date, selectedDate) ? "selected" : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            {format(date, "d")}
          </div>
          <span
            className={`date ${
              selectedDate && isSameDay(date, selectedDate)
                ? "selectedDateTopic"
                : ""
            } word`}
          >
            Word
          </span>
        </Box>
      ));
  };

  return (
    <div className="date-picker">
      <div className=" flex justify-center align-middle content-center">
        <div className="header w-[140px]">
          <button onClick={handlePreviousMonth}>
            <FaRegArrowAltCircleLeft />
          </button>
          <span className="w-[200px]">{format(currentMonth, "MMMM yyyy")}</span>
          <button onClick={handleNextMonth}>
            <FaRegArrowAltCircleRight />
          </button>
        </div>
      </div>
      <div className="dates">{renderDates()}</div>
    </div>
  );
};

export default DatePicker;
