import React, { useContext } from "react";
import { ClassType } from "./classes";
import { Teacher } from "./teachers";
import { Student } from "./students";
import { ScheduleType } from "./schedule";
import { IJournal } from "./journal";

interface StudentContextType {
  students: Student[];
  setStudents: (value: Student[]) => void;
  classes: ClassType[];
  setClasses: (value: ClassType[]) => void;
  teachers: Teacher[];
  setTeachers: (value: Teacher[]) => void;
  schedules: ScheduleType[];
  setSchedules: (value: ScheduleType[]) => void;
  journal: IJournal[];
  setJournal: (value: IJournal[]) => void;
}

export const DataContext = React.createContext<StudentContextType>({
  students: [],
  setStudents: (value: Student[]) => {},
  classes: [],
  setClasses: (value: ClassType[]) => {},
  teachers: [],
  setTeachers: (value: Teacher[]) => {},
  schedules: [],
  setSchedules: (value: ScheduleType[]) => {},
  journal: [],
  setJournal: (value: IJournal[]) => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};
