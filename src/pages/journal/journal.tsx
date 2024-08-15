import { Box } from "@mui/material";
import { Lesson } from "./lesson";
import Calendar from "./calendar";

export const Journal = () => {
  return (
    <Box>
      <Box
        sx={{ display: "flex", gap: 4, flexDirection: "column", marginTop: 5 }}
      >
        <Lesson />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
      </Box>
    </Box>
  );
};
