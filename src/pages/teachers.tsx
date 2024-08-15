// src/Teachers.tsx

import * as React from "react";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDataContext } from "./StudentContext";

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  classId: string;
  address: string;
  phone: string;
  email: string;
  subject: string;
  reyting: number;
  name: string;
}

export interface ClassType {
  id: string;
  name: string;
  teacherId: string;
  schedule: string;
}

const Teachers = () => {
  const { teachers, setTeachers, classes, setClasses } = useDataContext();

  React.useEffect(() => {
    const storedTeachers = localStorage.getItem("teachers");
    const storedClasses = localStorage.getItem("classes");

    if (storedTeachers) setTeachers(JSON.parse(storedTeachers));
    if (storedClasses) setClasses(JSON.parse(storedClasses));
  }, [setTeachers, setClasses]);

  React.useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  React.useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editTeacher, setEditTeacher] = React.useState<Teacher>({
    id: "",
    firstName: "",
    lastName: "",
    classId: "",
    address: "",
    phone: "",
    email: "",
    subject: "",
    reyting: 0,
    name: "",
  });

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newTeacher, setNewTeacher] = React.useState<Teacher>({
    id: "",
    firstName: "",
    lastName: "",
    classId: "",
    address: "",
    phone: "",
    email: "",
    subject: "",
    reyting: 0,
    name: "",
  });

  const handleOpenEditModal = (index: number) => {
    const teacherToEdit = teachers[index];
    setEditIndex(index);
    setEditTeacher(teacherToEdit);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditTeacher({
      id: "",
      firstName: "",
      lastName: "",
      classId: "",
      address: "",
      phone: "",
      email: "",
      subject: "",
      reyting: 0,
      name: "",
    });
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedTeachers = [...teachers];
      updatedTeachers[editIndex] = editTeacher;
      setTeachers(updatedTeachers);
      handleCloseEditModal();
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewTeacher({
      id: "",
      firstName: "",
      lastName: "",
      classId: "",
      address: "",
      phone: "",
      email: "",
      subject: "",
      reyting: 0,
      name: "",
    });
  };

  const handleSaveAdd = () => {
    const newTeacherWithId = { ...newTeacher, id: String(teachers.length + 1) };
    const newClass = {
      id: String(classes.length + 1),
      name: `${newTeacher.classId}`,
      teacherId: newTeacherWithId.id,
      schedule: "TBD",
    };

    setClasses([...classes, newClass]);
    setTeachers([...teachers, { ...newTeacherWithId, classId: newClass.id }]);

    handleCloseAddModal();
  };

  const deleteTeacher = (id: string) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    setTeachers(updatedTeachers);
  };

  const getClassName = (classId: string) => {
    const classObj = classes.find((cls) => cls.id.trim() === classId.trim());
    return classObj ? classObj.name : "Unknown";
  };

  return (
    <MuiTableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            <MuiTableCell>#</MuiTableCell>
            <MuiTableCell align="right">First name</MuiTableCell>
            <MuiTableCell align="right">Last name</MuiTableCell>
            <MuiTableCell align="right">Class</MuiTableCell>
            <MuiTableCell align="right">Address</MuiTableCell>
            <MuiTableCell align="right">Email</MuiTableCell>
            <MuiTableCell align="right">Phone</MuiTableCell>
            <MuiTableCell align="right">Subject</MuiTableCell>
            <MuiTableCell align="right">
              <Button onClick={handleOpenAddModal}>+</Button>
            </MuiTableCell>
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {teachers.map((row, index) => (
            <MuiTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <MuiTableCell component="th" scope="row">
                {index + 1}
              </MuiTableCell>
              <MuiTableCell align="right">{row.firstName}</MuiTableCell>
              <MuiTableCell align="right">{row.lastName}</MuiTableCell>
              <MuiTableCell align="right">
                {getClassName(row.classId)}
              </MuiTableCell>
              <MuiTableCell align="right">{row.address}</MuiTableCell>
              <MuiTableCell align="right">{row.email}</MuiTableCell>
              <MuiTableCell align="right">{row.phone}</MuiTableCell>
              <MuiTableCell align="right">{row.subject}</MuiTableCell>
              <MuiTableCell align="right">
                <Button onClick={() => handleOpenEditModal(index)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteTeacher(row.id)}>
                  <DeleteIcon className="text-red-600" />
                </Button>
              </MuiTableCell>
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>

      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={editTeacher.firstName}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, firstName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={editTeacher.lastName}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, lastName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={editTeacher.address}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value={editTeacher.phone}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={editTeacher.email}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            value={editTeacher.subject}
            onChange={(e) =>
              setEditTeacher({ ...editTeacher, subject: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            fullWidth
            value={editTeacher.reyting}
            onChange={(e) =>
              setEditTeacher({
                ...editTeacher,
                reyting: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={newTeacher.firstName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, firstName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={newTeacher.lastName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, lastName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="classId"
            label="Class"
            type="number"
            fullWidth
            value={newTeacher.classId}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, classId: String(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={newTeacher.address}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value={newTeacher.phone}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={newTeacher.email}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            value={newTeacher.subject}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subject: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            fullWidth
            value={newTeacher.reyting}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, reyting: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleSaveAdd} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MuiTableContainer>
  );
};

export default Teachers;
