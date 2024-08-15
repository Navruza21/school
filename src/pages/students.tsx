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
import { useDataContext } from "./StudentContext";
interface ClassData {
  id?: number;
  name?: string;
  teacher?: string;
  subject?: string;
}
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  classId: number;
  address: string;
  phone: string;
  reyting: number;
}

const StudentsPage = () => {
  const { students, setStudents, teachers, setTeachers, classes, setClasses } =
    useDataContext();
  // const [students, setStudents] = React.useState<Student[]>(studentsData);
  // const [clasData, setClaseData] = React.useState<
  //   {
  //     id: number;
  //     name: string;
  //     teacher: string;
  //     subject: string;
  //   }[]
  // >(classesData);

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editAddress, setEditAddress] = React.useState("");
  const [editClassId, setEditClassId] = React.useState<number>(0);
  const [editPhone, setEditPhone] = React.useState("");
  const [editReyting, setEditReyting] = React.useState<number>(0);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [addIndex, setAddIndex] = React.useState<number | null>(null);
  const [addFirstName, setAddFirstName] = React.useState("");
  const [addLastName, setAddLastName] = React.useState("");
  const [addAddress, setAddAddress] = React.useState("");
  const [addClassId, setAddClassId] = React.useState<number>(0);
  const [addPhone, setAddPhone] = React.useState("");
  const [addReyting, setAddReyting] = React.useState<number>(0);

  const handleOpenEditModal = (index: number) => {
    const studentToEdit = students[index];
    setEditIndex(index);
    setEditFirstName(studentToEdit.firstName);
    setEditLastName(studentToEdit.lastName);
    setEditAddress(studentToEdit.address);
    setEditClassId(studentToEdit.classId);
    setEditPhone(studentToEdit.phone);
    setEditReyting(studentToEdit.reyting);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditFirstName("");
    setEditLastName("");
    setEditAddress("");
    setEditClassId(0);
    setEditPhone("");
    setEditReyting(0);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = {
        ...updatedStudents[editIndex],
        firstName: editFirstName,
        lastName: editLastName,
        address: editAddress,
        classId: editClassId,
        phone: editPhone,
        reyting: editReyting,
      };
      setStudents(updatedStudents);
      handleCloseEditModal();
    }
  };

  // add dialog(modal)
  const handleOpenAddModal = () => {
    const studentToAdd: Student = {
      id: students.length + 1,
      firstName: addFirstName,
      lastName: addLastName,
      address: addAddress,
      classId: addClassId,
      phone: editPhone,
      reyting: addReyting,
    };
    setAddIndex(students.length);
    setAddFirstName(studentToAdd.firstName);
    setAddLastName(studentToAdd.lastName);
    setAddAddress(studentToAdd.address);
    setAddClassId(studentToAdd.classId);
    setAddPhone(studentToAdd.phone);
    setAddReyting(studentToAdd.reyting);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setAddIndex(null);
    setAddFirstName("");
    setAddLastName("");
    setAddAddress("");
    setAddClassId(0);
    setAddPhone("");
    setAddReyting(0);
  };

  const handleSaveAdd = () => {
    if (addIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[students.length] = {
        ...updatedStudents[students.length],
        id: students.length,
        firstName: addFirstName,
        lastName: addLastName,
        address: addAddress,
        classId: addClassId,
        phone: addPhone,
        reyting: addReyting,
      };
      setStudents(updatedStudents);
      setIsAddModalOpen(false);
    }
  };

  // delete
  const deleteStudent = (id: number): Student[] => {
    console.log("test delete1");

    const updatedStudents = students.filter((student) => student.id !== id);
    console.log("test delete2", updatedStudents);
    setStudents(updatedStudents);
    return updatedStudents;
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
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Reyting</TableCell>

            <TableCell align="right">
              <Button
                onClick={() => {
                  handleOpenAddModal();
                }}
              >
                +
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row, index) => (
            <TableRow
              key={row.firstName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>{" "}
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">
                {" "}
                {classes.find((item: ClassData) => item.id == row.id)?.name}
                {/* /{clasData.find((item) => item.id === row.id)} */}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.reyting}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    handleOpenEditModal(index);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon
                    onClick={() => {
                      deleteStudent(row.id);
                      console.log("delete");
                    }}
                    className="text-red-600"
                  />
                </Button>
              </TableCell>{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fisrtName"
            label="Fisrt Name"
            type="text"
            fullWidth
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />{" "}
          <TextField
            margin="dense"
            id="address"
            label="Addres"
            type="text"
            fullWidth
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="classId"
            label="classId"
            type="number"
            fullWidth
            value={editClassId}
            onChange={(e) => setEditClassId(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            id="phone"
            label="phone"
            type="text"
            fullWidth
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="reyting"
            label="reyting"
            type="text"
            fullWidth
            value={editReyting}
            onChange={(e) => setEditReyting(Number(e.target.value))}
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
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fisrtName"
            label="Fisrt Name"
            type="text"
            fullWidth
            onChange={(e) => setAddFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            onChange={(e) => setAddLastName(e.target.value)}
          />{" "}
          <TextField
            margin="dense"
            id="address"
            label="Addres"
            type="text"
            fullWidth
            onChange={(e) => setAddAddress(e.target.value)}
          />{" "}
          <TextField
            margin="dense"
            id="class"
            label="Class id"
            type="number"
            fullWidth
            onChange={(e) => setAddClassId(Number(e.target.value))}
          />{" "}
          <TextField
            margin="dense"
            id="phone"
            label="phone"
            type="text"
            fullWidth
            value={addPhone}
            onChange={(e) => setAddPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="reyting"
            label="reyting"
            type="number"
            fullWidth
            onChange={(e) => setAddReyting(Number(e.target.value))}
          />
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
export default StudentsPage;
