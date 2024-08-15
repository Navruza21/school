import React, { ClassType, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ScheduleData } from "./data";
import { Box } from "@mui/material";
import { Select, Space } from "antd";
import { useDataContext } from "./StudentContext";

export interface ScheduleType {
  key: string;
  classId: string;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: ScheduleType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ClassSchedule: React.FC = () => {
  const {
    students,
    setStudents,
    teachers,
    setTeachers,
    classes,
    setClasses,
    schedules,
    setSchedules,
  } = useDataContext();

  const [form] = Form.useForm();
  const [data, setData] = useState(
    schedules.filter((item: any) => item.classId == 1)
  );
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: ScheduleType) => record.key === editingKey;

  const edit = (record: Partial<ScheduleType> & { key: React.Key }) => {
    form.setFieldsValue({
      time: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ScheduleType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "time",
      dataIndex: "time",
      // width: "25%",
      editable: true,
    },
    {
      title: "monday",
      dataIndex: "monday",
      // width: "15%",
      editable: true,
    },
    {
      title: "tuesday",
      dataIndex: "tuesday",
      // width: "40%",
      editable: true,
    },
    {
      title: "wednesday",
      dataIndex: "wednesday",
      // width: "25%",
      editable: true,
    },
    {
      title: "thursday",
      dataIndex: "thursday",
      // width: "15%",
      editable: true,
    },
    {
      title: "friday",
      dataIndex: "friday",
      // width: "40%",
      editable: true,
    },
    {
      title: "saturday",
      dataIndex: "saturday",
      // width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: ScheduleType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ScheduleType) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);

    const newData = schedules.filter((item: any) => item.classId === value);

    console.log(
      schedules.filter((item: any) => item.classId === value),
      "test"
    );

    setData(newData);
  };
  const classnamearray = classes.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <>
      <Box className="my-5">
        <Space wrap>
          <Select
            defaultValue="Class 10A"
            style={{ width: 120 }}
            onChange={handleChange}
            options={classnamearray}
          />
        </Space>
      </Box>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default ClassSchedule;
