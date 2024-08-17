import * as React from "react";
import { Table, Button, Modal, Input, Select, Form } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDataContext } from "./StudentContext";

const { Option } = Select;

export type ClassType = {
  id: string;
  name: string;
  teacherId: string;
  schedule: string;
};

const Classes = () => {
  const { teachers, classes, setClasses } = useDataContext();
  // React.useEffect(() => {
  //   const storedClasses = localStorage.getItem("classes");
  //   if (storedClasses) setClasses(JSON.parse(storedClasses));
  // }, [setClasses]);

  // React.useEffect(() => {
  //   localStorage.setItem("classes", JSON.stringify(classes));
  // }, [classes]);

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editTeacher, setEditTeacher] = React.useState("");
  const [editSchedule, setEditSchedule] = React.useState("");

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [addTeacher, setAddTeacher] = React.useState("");
  const [addSchedule, setAddSchedule] = React.useState("");

  const handleOpenEditModal = (index: number) => {
    const classToEdit = classes[index];
    setEditIndex(index);
    setEditName(classToEdit.name);
    setEditTeacher(classToEdit.teacherId);
    setEditSchedule(classToEdit.schedule);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditTeacher("");
    setEditSchedule("");
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedClasses = [...classes];
      updatedClasses[editIndex] = {
        ...updatedClasses[editIndex],
        name: editName,
        teacherId: editTeacher,
        schedule: editSchedule,
      };
      setClasses(updatedClasses);
      handleCloseEditModal();
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setAddName("");
    setAddTeacher("");
    setAddSchedule("");
  };

  const handleSaveAdd = () => {
    const newClass: ClassType = {
      id: String(classes.length + 1),
      name: addName,
      teacherId: addTeacher,
      schedule: addSchedule,
    };
    setClasses([...classes, newClass]);
    handleCloseAddModal();
  };

  const deleteClass = (id: string) => {
    const updatedClasses = classes.filter((item) => item.id !== id);
    setClasses(updatedClasses);
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : "";
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Teacher",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (teacherId: string) => getTeacherName(teacherId),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any, index: number) => (
        <span>
          <Button
            onClick={() => handleOpenEditModal(index)}
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => deleteClass(record.id)}
            icon={<DeleteOutlined />}
            danger
          />
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end my-3">
        <Button onClick={handleOpenAddModal} icon={<PlusOutlined />}></Button>
      </div>
      <Table
        dataSource={classes}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Edit Class"
        visible={isEditModalOpen}
        onCancel={handleCloseEditModal}
        onOk={handleSaveEdit}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Teacher">
            <Select
              value={editTeacher}
              onChange={(value) => setEditTeacher(value)}
            >
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Schedule">
            <Input
              value={editSchedule}
              onChange={(e) => setEditSchedule(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Class"
        visible={isAddModalOpen}
        onCancel={handleCloseAddModal}
        onOk={handleSaveAdd}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Teacher">
            <Select
              value={addTeacher}
              onChange={(value) => setAddTeacher(value)}
            >
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Classes;
