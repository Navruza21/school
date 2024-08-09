import React, { useContext } from "react";
import { ClassType } from "./classes";
import { Teacher } from "./teachers";
import { Student } from "./students";
import { Schedule } from "./schedule";

interface StudentContextType {
  students: Student[];
  setStudents: (value: Student[]) => void;
  classes: ClassType[];
  setClasses: (value: ClassType[]) => void;
  teachers: Teacher[];
  setTeachers: (value: Teacher[]) => void;
  schedules: Schedule[];
  setSchedules: (value: Schedule[]) => void;
}

export const DataContext = React.createContext<StudentContextType>({
  students: [],
  setStudents: (value: Student[]) => {},
  classes: [],
  setClasses: (value: ClassType[]) => {},
  teachers: [],
  setTeachers: (value: Teacher[]) => {},
  schedules: [],
  setSchedules: (value: Schedule[]) => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};
