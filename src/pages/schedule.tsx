// import React, { useState } from "react";
// import { useDataContext } from "./StudentContext";
// import { ClassType } from "./classes";
// import { Table, Tag } from "antd";
// import ColumnGroup from "antd/es/table/ColumnGroup";
// import Column from "antd/es/table/Column";
// import { Tabs } from "antd";
// import type { TabsProps } from "antd";

// // export interface Schedule {
// //   day: string;
// //   time: string;
// //   subject: string;
// // }
// // const columns = [
// //   {
// //     title: "Vaqti",
// //     dataIndex: "time",
// //     key: "time",
// //   },
// //   {
// //     title: "Dushanba",
// //     dataIndex: "monday",
// //     key: "monday",
// //   },
// //   {
// //     title: "Seshanba",
// //     dataIndex: "tuesday",
// //     key: "tuesday",
// //   },
// //   {
// //     title: "Chorshanba",
// //     dataIndex: "wednesday",
// //     key: "wednesday",
// //   },
// //   {
// //     title: "Payshanba",
// //     dataIndex: "thursday",
// //     key: "thursday",
// //   },
// //   {
// //     title: "Juma",
// //     dataIndex: "friday",
// //     key: "friday",
// //   },
// //   {
// //     title: "Shanba",
// //     dataIndex: "saturday",
// //     key: "saturday",
// //   },
// // ];

// export interface ScheduleType {
//   key: string;
//   classId: 1;
//   time: string;
//   monday: string;
//   tuesday: string;
//   wednesday: string;
//   thursday: string;
//   friday: string;
//   saturday: string;
// }

// // {const Schedule}
// const onChange = (key: string) => {
//   console.log(key);
// };
// export let schedulesColumns: JSX.Element;
// const ClassSchedule = () => {
//   const { classes, setClasses, schedules, setSchedules } = useDataContext();

//   const Schedule1 = () => {
//     return (
//       <Table dataSource={schedules[1]}>
//         <>
//           <Column title="time" dataIndex="time" key="time" />
//           <Column title="monday" dataIndex="monday" key="monday" />
//           <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
//           <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
//           <Column title="thursday" dataIndex="thursday" key="thursday" />
//           <Column title="friday" dataIndex="friday" key="friday" />
//           <Column title="saturday" dataIndex="saturday" key="saturday" />
//         </>
//       </Table>
//     );
//   };
//   const Schedule2 = () => {
//     return (
//       <Table dataSource={schedules[2]}>
//         <>
//           <Column title="time" dataIndex="time" key="time" />
//           <Column title="monday" dataIndex="monday" key="monday" />
//           <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
//           <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
//           <Column title="thursday" dataIndex="thursday" key="thursday" />
//           <Column title="friday" dataIndex="friday" key="friday" />
//           <Column title="saturday" dataIndex="saturday" key="saturday" />
//         </>
//       </Table>
//     );
//   };
//   const Schedule3 = () => {
//     return (
//       <Table dataSource={schedules[3]}>
//         <>
//           <Column title="time" dataIndex="time" key="time" />
//           <Column title="monday" dataIndex="monday" key="monday" />
//           <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
//           <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
//           <Column title="thursday" dataIndex="thursday" key="thursday" />
//           <Column title="friday" dataIndex="friday" key="friday" />
//           <Column title="saturday" dataIndex="saturday" key="saturday" />
//         </>
//       </Table>
//     );
//   };
//   const Schedule4 = () => {
//     return (
//       <Table dataSource={schedules[4]}>
//         <>
//           <Column title="time" dataIndex="time" key="time" />
//           <Column title="monday" dataIndex="monday" key="monday" />
//           <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
//           <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
//           <Column title="thursday" dataIndex="thursday" key="thursday" />
//           <Column title="friday" dataIndex="friday" key="friday" />
//           <Column title="saturday" dataIndex="saturday" key="saturday" />
//         </>
//       </Table>
//     );
//   };
//   const Schedule5 = () => {
//     return (
//       <Table dataSource={schedules[5]}>
//         <>
//           <Column title="time" dataIndex="time" key="time" />
//           <Column title="monday" dataIndex="monday" key="monday" />
//           <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
//           <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
//           <Column title="thursday" dataIndex="thursday" key="thursday" />
//           <Column title="friday" dataIndex="friday" key="friday" />
//           <Column title="saturday" dataIndex="saturday" key="saturday" />
//         </>
//       </Table>
//     );
//   };
//   schedulesColumns = [Schedule1, Schedule2, Schedule3, Schedule4, Schedule5];
//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: "Class 10A",
//       children: <Schedule1 />,
//     },
//     {
//       key: "2",
//       label: "Class 10B",
//       children: <Schedule2 />,
//     },
//     {
//       key: "3",
//       label: "Class 11A",
//       children: <Schedule3 />,
//     },
//     {
//       key: "4",
//       label: "Class 11B",
//       children: <Schedule4 />,
//     },
//     {
//       key: "5",
//       label: "Class 11D",
//       children: <Schedule5 />,
//     },
//   ];

//   return (
//     <div>
//       <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
//     </div>
//   );
// };

// export default ClassSchedule;

import React, { useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ScheduleData } from "./data";

export interface ScheduleType {
  key: string;
  classId: number;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

interface Item {
  key: string;
  classId: number;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}
const originData = ScheduleData;
// const originData: Item[] = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
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
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
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
      const row = (await form.validateFields()) as Item;

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
      render: (_: any, record: Item) => {
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
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
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
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ClassSchedule;
