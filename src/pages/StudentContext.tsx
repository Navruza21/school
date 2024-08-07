import React, { useContext } from "react";
import { ClassType } from "./classes";
import { Teacher } from "./teachers";
import { Student } from "./students";

interface StudentContextType {
  students: Student[];
  setStudents: (value: Student[]) => void;
  classes: ClassType[];
  setClasses: (value: ClassType[]) => void;
  teachers: Teacher[];
  setTeachers: (value: Teacher[]) => void;
}

export const DataContext = React.createContext<StudentContextType>({
  students: [],
  setStudents: (value: Student[]) => {},
  classes: [],
  setClasses: (value: ClassType[]) => {},
  teachers: [],
  setTeachers: (value: Teacher[]) => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};
