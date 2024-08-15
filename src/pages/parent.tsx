import React, { useState } from "react";
import { Table, Input, Modal, Form, Select } from "antd";
import { useDataContext } from "./StudentContext";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBinFill } from "react-icons/ri";
import { Student } from "./students";

function Parents() {
  const { parents, setParents, students, classes } = useDataContext();
  const [searchList, setSearchList] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any | null>(null);
  const [form] = Form.useForm();

  const handleDelete = (parentId: string) => {
    const newParents = students.filter((parent) => parent.id !== parentId);
    setParents(newParents);
  };

  const handleOpenEditModal = (parentData: any) => {
    setEditFormData(parentData);
    form.setFieldsValue(parentData);
    setIsEditModalOpen(true);
  };

  const handleEditFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedParents = students.map((parent) =>
          parent.id === editFormData.id
            ? { ...parent, ...values, studentId: values.studentId }
            : parent
        );
        setParents(updatedParents);
        setIsEditModalOpen(false);
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "F.I.Sh", dataIndex: "parent", key: "parent" },
    {
      title: "Farzand",
      key: "fullname",
      render: (text: string, record: Student) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: "Sinf",
      key: "classId",
      render: (student: Student) => {
        return classes.find((c) => c.id === String(student.classId))?.name;
      },
    },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Manzili", dataIndex: "address", key: "address" },
    { title: "Ota/Ona", dataIndex: "relation", key: "relation" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div style={{ textAlign: "center" }}>
          <LuClipboardEdit
            onClick={() => handleOpenEditModal(record)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <RiDeleteBinFill
            onClick={() => handleDelete(record.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Search"
          value={searchList}
          onChange={(e) => setSearchList(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <Table
        dataSource={students}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />

      <Modal
        title="Edit Parent"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditFormSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Parent Name"
            name="parent"
            rules={[{ required: true, message: "Please enter parent name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Relation"
            name="relation"
            rules={[{ required: true, message: "Please select relation" }]}
          >
            <Select>
              <Select.Option value="Father">Father</Select.Option>
              <Select.Option value="Mother">Mother</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Parents;
