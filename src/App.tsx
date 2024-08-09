import React, { useState } from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/dashboard";
import Classes from "./pages/classes";
import Teachers from "./pages/teachers";
import StudentsPage from "./pages/students";
import {
  classesData,
  classScheduleData,
  studentsData,
  teachersData,
} from "./components/layout/data";
import { DataContext } from "./pages/StudentContext";
import Layout from "./components/layout";
import { FaJournalWhills } from "react-icons/fa";
import ClassSchedule from "./pages/schedule";
// import Schedules from "./pages/schedule";

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
  const [students, setStudents] = React.useState(studentsData);
  const [teachers, setTeachers] = React.useState(teachersData);
  const [classes, setClasses] = React.useState(classesData);
  const [schedules, setSchedules] = React.useState(classScheduleData);

  const pages: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Classes: <Classes />,
    Teachers: <Teachers />,
    Students: <StudentsPage />,
    Jurnal: <FaJournalWhills />,
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
