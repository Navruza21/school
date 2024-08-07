import React, { useState } from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/dashboard";
import Classes, { ClassType } from "./pages/classes";
import Teachers, { Teacher } from "./pages/teachers";
import StudentsPage, { Student } from "./pages/students";
import { classesData, studentsData, teachersData } from "./pages/data";
import { DataContext } from "./pages/StudentContext";
import Layout from "./components/layout";
import Jurnal from "./pages/parent";
import Parents from "./pages/Parents";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3700b3",
    },
  },
});

export const RouterContext = React.createContext({
  activePage: "Dasheboard",
  setActivePage: (value: string) => {},
});

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [students, setStudents] = React.useState<Student[]>(studentsData);
  const [teachers, setTeachers] = React.useState<Teacher[]>(teachersData);
  const [classes, setClasses] = React.useState<ClassType[]>(classesData);

  const pages: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Classes: <Classes />,
    Teachers: <Teachers />,
    Students: <StudentsPage />,
    Jurnal: <Jurnal />,
    Parents: <Parents />,
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
