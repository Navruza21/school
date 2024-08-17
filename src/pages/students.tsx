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
  MenuItem,
  Select,
} from "@mui/material";
import { useDataContext } from "./StudentContext";

interface ClassData {
  id: number;
  name: string;
  teacher: string;
  subject: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  classId: string;
  address: string;
  phone: string;
  reyting: number;
  parent: string;
  relation: string;
}

const StudentsPage = () => {
  const { students, setStudents, classes } = useDataContext();

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editAddress, setEditAddress] = React.useState("");
  const [editClassId, setEditClassId] = React.useState<string>("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editReyting, setEditReyting] = React.useState<number>(0);
  const [editParent, setEditParent] = React.useState("");
  const [editRelation, setEditRelation] = React.useState("");

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [addFirstName, setAddFirstName] = React.useState("");
  const [addLastName, setAddLastName] = React.useState("");
  const [addAddress, setAddAddress] = React.useState("");
  const [addClassId, setAddClassId] = React.useState<string>("");
  const [addPhone, setAddPhone] = React.useState("");
  const [addReyting, setAddReyting] = React.useState<number>(0);
  const [addParent, setAddParent] = React.useState("");
  const [addRelation, setAddRelation] = React.useState("");

  const handleOpenEditModal = (index: number) => {
    const studentToEdit = students[index];
    setEditIndex(index);
    setEditFirstName(studentToEdit.firstName);
    setEditLastName(studentToEdit.lastName);
    setEditAddress(studentToEdit.address);
    setEditClassId(studentToEdit.classId);
    setEditPhone(studentToEdit.phone);
    setEditReyting(studentToEdit.reyting);
    setEditParent(studentToEdit.parent);
    setEditRelation(studentToEdit.relation);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditFirstName("");
    setEditLastName("");
    setEditAddress("");
    setEditClassId("");
    setEditPhone("");
    setEditReyting(0);
    setEditParent("");
    setEditRelation("");
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
        parent: editParent,
        relation: editRelation,
      };
      setStudents(updatedStudents);
      handleCloseEditModal();
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setAddFirstName("");
    setAddLastName("");
    setAddAddress("");
    setAddClassId("");
    setAddPhone("");
    setAddReyting(0);
    setAddParent("");
    setAddRelation("");
  };

  const handleSaveAdd = () => {
    const newStudent: Student = {
      id: String(students.length + 1),
      firstName: addFirstName,
      lastName: addLastName,
      address: addAddress,
      classId: addClassId,
      phone: addPhone,
      reyting: addReyting,
      parent: addParent,
      relation: addRelation,
    };

    setStudents([...students, newStudent]);
    handleCloseAddModal();
  };

  const deleteStudent = (id: string) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Reyting</TableCell>
            <TableCell align="right">
              <Button onClick={handleOpenAddModal}>+</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">
                {classes.find((cls) => cls.id === row.classId)?.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.reyting}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleOpenEditModal(index)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteStudent(row.id)}>
                  <DeleteIcon className="text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Student */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
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
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
          <Select
            margin="dense"
            id="classId"
            label="Class"
            fullWidth
            value={editClassId}
            onChange={(e) => setEditClassId(e.target.value as string)}
          >
            {classes.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="reyting"
            label="Reyting"
            type="number"
            fullWidth
            value={editReyting}
            onChange={(e) => setEditReyting(Number(e.target.value))}
          />
          <Select
            margin="dense"
            id="parent"
            label="Parent"
            fullWidth
            value={editParent}
            onChange={(e) => setEditParent(e.target.value as string)}
          >
            {students.map((student) => (
              <MenuItem key={student.parent} value={student.parent}>
                {student.parent}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            id="relation"
            label="Relation"
            fullWidth
            value={editRelation}
            onChange={(e) => setEditRelation(e.target.value as string)}
          >
            <MenuItem value="Father">Father</MenuItem>
            <MenuItem value="Mother">Mother</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={addFirstName}
            onChange={(e) => setAddFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={addLastName}
            onChange={(e) => setAddLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={addAddress}
            onChange={(e) => setAddAddress(e.target.value)}
          />
          <Select
            margin="dense"
            id="classId"
            label="Class"
            fullWidth
            value={addClassId}
            onChange={(e) => setAddClassId(e.target.value as string)}
          >
            {classes.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value={addPhone}
            onChange={(e) => setAddPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="reyting"
            label="Reyting"
            type="number"
            fullWidth
            value={addReyting}
            onChange={(e) => setAddReyting(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            id="parent"
            label="Parents Full Name"
            type="text"
            fullWidth
            value={addParent}
            onChange={(e) => setAddParent(e.target.value)}
          />
          <Select
            margin="dense"
            id="relation"
            label="Relation"
            fullWidth
            value={addRelation}
            onChange={(e) => setAddRelation(e.target.value as string)}
          >
            <MenuItem value="Father">Father</MenuItem>
            <MenuItem value="Mother">Mother</MenuItem>
          </Select>
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
