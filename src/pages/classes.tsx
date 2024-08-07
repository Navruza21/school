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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { classesData } from "./data";
import { useDataContext } from "./StudentContext";

export type ClassType = {
  id: number;
  name: string;
  teacher: string;
};

const Classes = () => {
  const { students, setStudents, teachers, setTeachers, classes, setClasses } =
    useDataContext();
  //

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editTeacher, setEditTeacher] = React.useState("");

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [addIndex, setAddIndex] = React.useState<number | null>(null);
  const [addName, setAddName] = React.useState("");
  const [addTeacher, setAddTeacher] = React.useState("");

  // edit dialog(modal)
  const handleOpenEditModal = (index: number) => {
    const classToEdit = classes[index];
    setEditIndex(index);
    setEditName(classToEdit.name);
    setEditTeacher(classToEdit.teacher);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditTeacher("");
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedClasses = [...classes];
      updatedClasses[editIndex] = {
        ...updatedClasses[editIndex],
        name: editName,
        teacher: editTeacher,
      };
      setClasses(updatedClasses);
      handleCloseEditModal();
    }
  };

  // add dialog(modal)
  const handleOpenAddModal = () => {
    const classToAdd: ClassType = {
      id: students.length + 1,
      name: addName,
      teacher: addTeacher,
    };
    setAddIndex(students.length);
    setAddName(classToAdd.name);
    setAddTeacher(classToAdd.teacher);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setAddIndex(null);
    setAddName("");
    setAddTeacher("");
  };

  const handleSaveAdd = () => {
    if (addIndex !== null) {
      const updatedClasses = [...classes];
      updatedClasses[classes.length] = {
        ...updatedClasses[classes.length],
        id: classes.length,
        name: addName,
        teacher: addTeacher,
      };
      setClasses(updatedClasses);
      setIsAddModalOpen(false);
    }
  };
  // delete
  const deleteClass = (id: number): ClassType[] => {
    console.log("test delete1");
    const updatedClasses = classes.filter((item) => item.id !== id);
    setClasses(updatedClasses);
    return updatedClasses;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Teacher</TableCell>
            <TableCell align="right">
              <Button>+</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>{" "}
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.teacher}</TableCell>
              <TableCell align="right">
                {" "}
                <Button>
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => {
                    deleteClass(row.id);
                  }}
                >
                  <DeleteIcon className="text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="teacher"
            label="teacher"
            type="text"
            fullWidth
            value={editTeacher}
            onChange={(e) => setEditTeacher(e.target.value)}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label=" Name"
            type="text"
            fullWidth
            onChange={(e) => setAddName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="Tacher"
            label="Tacher"
            type="text"
            fullWidth
            onChange={(e) => setAddTeacher(e.target.value)}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleSaveAdd} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
export default Classes;
