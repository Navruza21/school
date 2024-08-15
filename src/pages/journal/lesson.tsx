import { Box, TableSortLabel } from "@mui/material";
import { Button, Typography } from "@mui/material";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Assessment from "./assessment";
import "./lesson.css";
import Calendar from "./calendar";

const subjects = [
  { subject: "Math" },
  { subject: "Biology" },
  { subject: "history" },
  { subject: "biology " },
  { subject: "chemistry" },
  { subject: "geography " },
  { subject: "physics" },
  { subject: "computer science" },
  { subject: "technology" },
  { subject: "music" },
  { subject: "drawing " },
  { subject: "ecology " },
  { subject: "literature " },
  { subject: "literature " },
];

export const Lesson = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ boxShadow: 3, bgcolor: "white", height: "auto" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
            className="scrollbar-hidden"
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ display: "inline-flex" }}
            >
              {subjects.map((subj, index) => (
                <Tab
                  key={index}
                  label={subj.subject.trim()}
                  value={`${index + 1}`}
                />
              ))}
            </TabList>
          </Box>
          {subjects.map((subj, index) => (
            <TabPanel key={index} value={`${index + 1}`} sx={{ padding: 0 }}>
              <Box sx={{ padding: 0 }}>
                <Assessment subject={subj.subject.trim()} />
              </Box>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};
