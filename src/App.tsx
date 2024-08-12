import React, { useState } from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/dashboard";
import Classes, { ClassType } from "./pages/classes";
import Teachers, { Teacher } from "./pages/teachers";
import StudentsPage, { Student } from "./pages/students";
import {
  classesData,
  studentsData,
  journalData,
  teachersData,
  ScheduleData,
} from "./pages/data";
import { DataContext } from "./pages/StudentContext";
import Jurnal from "./pages/journal";
import Parents from "./pages/parent";
import ClassSchedule, { ScheduleType } from "./pages/schedule";
import { IJournal } from "./pages/journal";
import { Layout } from "./components/layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3700b3",
    },
  },
});

export const RouterContext = React.createContext({
  activePage: "Dashboard",
  setActivePage: (value: string) => {},
});

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [students, setStudents] = React.useState<Student[]>(studentsData);
  const [teachers, setTeachers] = React.useState<Teacher[]>(teachersData);
  const [classes, setClasses] = React.useState<ClassType[]>(classesData);
  const [journal, setJournal] = React.useState<IJournal[]>(journalData);
  const [schedules, setSchedules] =
    React.useState<ScheduleType[]>(ScheduleData);

  const pages: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Classes: <Classes />,
    Teachers: <Teachers />,
    Students: <StudentsPage />,
    Jurnal: <Jurnal />,
    Parents: <Parents />,
    Schedules: <ClassSchedule />,
  };

  return (
    <ThemeProvider theme={theme}>
      <RouterContext.Provider value={{ activePage, setActivePage }}>
        <DataContext.Provider
          value={{
            students,
            setStudents,
            classes,
            setClasses,
            teachers,
            setTeachers,
            journal,
            setJournal,
            schedules,
            setSchedules,
          }}
        >
          <CssBaseline />
          <Layout>
            <p className="font-bold text-2xl"> {activePage}</p>
            {pages[activePage]}
          </Layout>
        </DataContext.Provider>
      </RouterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
