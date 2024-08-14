import React from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  getDay,
} from "date-fns";
import "./calendar.css";

const holidays = [new Date(2024, 0, 1), new Date(2024, 6, 4)];

const isHoliday = (date: Date): boolean => {
  return holidays.some((holiday) => isSameDay(date, holiday));
};

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const handlePreviousMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date): void => {
    onDateChange(date);
  };

  const renderDates = (): JSX.Element[] => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    return dates
      .filter((date) => getDay(date) !== 0 && !isHoliday(date))
      .map((date) => (
        <div
          key={date.toISOString()}
          className={`date ${isSameDay(date, selectedDate) ? "selected" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {format(date, "d")}
        </div>
      ));
  };

  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="dates">{renderDates()}</div>
    </div>
  );
};

export default DatePicker;
