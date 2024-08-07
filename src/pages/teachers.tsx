import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { teachersData } from "./data";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  classId: number;
  address: string;
  phone: string;
  email: string;
  subject: string;
  reyting: number;
}
const Teachers = () => {
  const [teachers, setTeachers] = React.useState<Teacher[]>(teachersData);

  const deleteTeacher = (id: number): Teacher[] => {
    console.log("test delete1");

    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    console.log("test delete2", updatedTeachers);
    setTeachers(updatedTeachers);
    return updatedTeachers;
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">classId</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">
              {" "}
              <Button>+</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((row, index) => (
            <TableRow
              key={row.firstName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>{" "}
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.classId}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">
                {" "}
                <Button>
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => {
                    deleteTeacher(row.id);
                    console.log("delete");
                  }}
                >
                  <DeleteIcon className="text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Teachers;
