import React, { useState } from "react";
import { useDataContext } from "./StudentContext";
import { ClassType } from "./classes";
import { Table, Tag } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

export interface Schedule {
  day: string;
  time: string;
  subject: string;
}
// const columns = [
//   {
//     title: "Vaqti",
//     dataIndex: "time",
//     key: "time",
//   },
//   {
//     title: "Dushanba",
//     dataIndex: "monday",
//     key: "monday",
//   },
//   {
//     title: "Seshanba",
//     dataIndex: "tuesday",
//     key: "tuesday",
//   },
//   {
//     title: "Chorshanba",
//     dataIndex: "wednesday",
//     key: "wednesday",
//   },
//   {
//     title: "Payshanba",
//     dataIndex: "thursday",
//     key: "thursday",
//   },
//   {
//     title: "Juma",
//     dataIndex: "friday",
//     key: "friday",
//   },
//   {
//     title: "Shanba",
//     dataIndex: "saturday",
//     key: "saturday",
//   },
// ];

const data1 = [
  {
    key: "1",
    classId: 1,
    time: "08:00 - 08:45",
    monday: "Mathematics",
    tuesday: "",
    wednesday: "Physics",
    thursday: "Chemistry",
    friday: "Biology",
    saturday: "History",
  },
  {
    key: "2",
    classId: 1,
    time: "08:50 - 09:35",
    monday: "Physics",
    tuesday: "Physics",
    wednesday: "Chemistry",
    thursday: "",
    friday: "History",
    saturday: "Mathematics",
  },
  {
    key: "3",
    classId: 1,
    time: "09:40 - 10:25",
    monday: "Chemistry",
    tuesday: "Chemistry",
    wednesday: "Biology",
    thursday: "History",
    friday: "Mathematics",
    saturday: "Physics",
  },
  {
    key: "4",
    classId: 1,
    time: "10:30 - 11:15",
    monday: "Biology",
    tuesday: "Biology",
    wednesday: "History",
    thursday: "Mathematics",
    friday: "Physics",
    saturday: "Chemistry",
  },
  {
    key: "5",
    classId: 1,
    time: "11:20 - 12:05",
    monday: "History",
    tuesday: "",
    wednesday: "Mathematics",
    thursday: "Physics",
    friday: "Chemistry",
    saturday: "",
  },
  // Boshqa fanlar...
];
const data2 = [
  {
    key: "1",
    classId: 2,
    time: "08:00 - 08:45",
    monday: "Physics",
    tuesday: "Physics",
    wednesday: "Chemistry",
    thursday: "",
    friday: "History",
    saturday: "Mathematics",
  },
  {
    key: "2",
    classId: 2,
    time: "08:50 - 09:35",
    monday: "Chemistry",
    tuesday: "",
    wednesday: "Biology",
    thursday: "History",
    friday: "Mathematics",
    saturday: "Physics",
  },
  {
    key: "3",
    classId: 2,
    time: "09:40 - 10:25",
    monday: "",
    tuesday: "Mathematics",
    wednesday: "Physics",
    thursday: "Chemistry",
    friday: "Biology",
    saturday: "History",
  },
  {
    key: "4",
    classId: 2,
    time: "10:30 - 11:15",
    monday: "History",
    tuesday: "History",
    wednesday: "Mathematics",
    thursday: "Physics",
    friday: "Chemistry",
    saturday: "",
  },
  {
    key: "5",
    classId: 2,
    time: "11:20 - 12:05",
    monday: "Biology",
    tuesday: "Biology",
    wednesday: "",
    thursday: "Mathematics",
    friday: "Physics",
    saturday: "Chemistry",
  },
  // Boshqa fanlar...
];
const data3 = [
  {
    key: "1",
    classId: 3,
    time: "08:00 - 08:45",
    monday: "Chemistry",
    tuesday: "Chemistry",
    wednesday: "Biology",
    thursday: "History",
    friday: "Mathematics",
    saturday: "",
  },
  {
    key: "2",
    classId: 3,
    time: "08:50 - 09:35",
    monday: "",
    tuesday: "History",
    wednesday: "Mathematics",
    thursday: "Physics",
    friday: "Chemistry",
    saturday: "Biology",
  },
  {
    key: "3",
    classId: 3,
    time: "09:40 - 10:25",
    monday: "",
    tuesday: "Biology",
    wednesday: "History",
    thursday: "Mathematics",
    friday: "Physics",
    saturday: "Chemistry",
  },
  {
    key: "4",
    classId: 3,
    time: "10:30 - 11:15",
    monday: "Mathematics",
    tuesday: "Mathematics",
    wednesday: "Physics",
    thursday: "",
    friday: "Biology",
    saturday: "",
  },
  {
    key: "5",
    classId: 3,
    time: "11:20 - 12:05",
    monday: "Physics",
    tuesday: "",
    wednesday: "Chemistry",
    thursday: "Biology",
    friday: "History",
    saturday: "Mathematics",
  },
  // Boshqa fanlar...
];
const data4 = [
  {
    key: "1",
    classId: 4,
    time: "08:00 - 08:45",
    monday: "Mathematics",
    tuesday: "Mathematics",
    wednesday: "",
    thursday: "Chemistry",
    friday: "Biology",
    saturday: "History",
  },
  {
    key: "2",
    classId: 4,
    time: "08:50 - 09:35",
    monday: "",
    tuesday: "Physics",
    wednesday: "Chemistry",
    thursday: "Biology",
    friday: "History",
    saturday: "Mathematics",
  },
  {
    key: "3",
    classId: 4,
    time: "09:40 - 10:25",
    monday: "Chemistry",
    tuesday: "Chemistry",
    wednesday: "Biology",
    thursday: "",
    friday: "Mathematics",
    saturday: "Physics",
  },
  {
    key: "4",
    classId: 4,
    time: "10:30 - 11:15",
    monday: "Biology",
    tuesday: "",
    wednesday: "History",
    thursday: "Mathematics",
    friday: "Physics",
    saturday: "Chemistry",
  },
  {
    key: "5",
    classId: 4,
    time: "11:20 - 12:05",
    monday: "",
    tuesday: "History",
    wednesday: "Mathematics",
    thursday: "Physics",
    friday: "Chemistry",
    saturday: "",
  },
  // Boshqa fanlar...
];
const data5 = [
  {
    key: "1",
    classId: 5,
    time: "08:00 - 08:45",
    monday: "Mathematics",
    tuesday: "Mathematics",
    wednesday: "Physics",
    thursday: "Chemistry",
    friday: "",
    saturday: "History",
  },
  {
    key: "2",
    classId: 5,
    time: "08:50 - 09:35",
    monday: "",
    tuesday: "Physics",
    wednesday: "Chemistry",
    thursday: "Biology",
    friday: "History",
    saturday: "Mathematics",
  },
  {
    key: "3",
    classId: 5,
    time: "09:40 - 10:25",
    monday: "Chemistry",
    tuesday: "Chemistry",
    wednesday: "Biology",
    thursday: "",
    friday: "Mathematics",
    saturday: "Physics",
  },
  {
    key: "4",
    classId: 5,
    time: "10:30 - 11:15",
    monday: "Biology",
    tuesday: "",
    wednesday: "History",
    thursday: "Mathematics",
    friday: "Physics",
    saturday: "Chemistry",
  },
  {
    key: "5",
    classId: 5,
    time: "11:20 - 12:05",
    monday: "History",
    tuesday: "History",
    wednesday: "Mathematics",
    thursday: "Physics",
    friday: "Chemistry",
    saturday: "",
  },
  // Boshqa fanlar...
];

const Schedule1 = () => {
  return (
    <Table dataSource={data1}>
      <>
        <Column title="time" dataIndex="time" key="time" />
        <Column title="monday" dataIndex="monday" key="monday" />
        <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
        <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
        <Column title="thursday" dataIndex="thursday" key="thursday" />
        <Column title="friday" dataIndex="friday" key="friday" />
        <Column title="saturday" dataIndex="saturday" key="saturday" />
      </>
    </Table>
  );
};
const Schedule2 = () => {
  return (
    <Table dataSource={data2}>
      <>
        <Column title="time" dataIndex="time" key="time" />
        <Column title="monday" dataIndex="monday" key="monday" />
        <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
        <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
        <Column title="thursday" dataIndex="thursday" key="thursday" />
        <Column title="friday" dataIndex="friday" key="friday" />
        <Column title="saturday" dataIndex="saturday" key="saturday" />
      </>
    </Table>
  );
};
const Schedule3 = () => {
  return (
    <Table dataSource={data3}>
      <>
        <Column title="time" dataIndex="time" key="time" />
        <Column title="monday" dataIndex="monday" key="monday" />
        <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
        <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
        <Column title="thursday" dataIndex="thursday" key="thursday" />
        <Column title="friday" dataIndex="friday" key="friday" />
        <Column title="saturday" dataIndex="saturday" key="saturday" />
      </>
    </Table>
  );
};
const Schedule4 = () => {
  return (
    <Table dataSource={data4}>
      <>
        <Column title="time" dataIndex="time" key="time" />
        <Column title="monday" dataIndex="monday" key="monday" />
        <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
        <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
        <Column title="thursday" dataIndex="thursday" key="thursday" />
        <Column title="friday" dataIndex="friday" key="friday" />
        <Column title="saturday" dataIndex="saturday" key="saturday" />
      </>
    </Table>
  );
};
const Schedule5 = () => {
  return (
    <Table dataSource={data5}>
      <>
        <Column title="time" dataIndex="time" key="time" />
        <Column title="monday" dataIndex="monday" key="monday" />
        <Column title="tuesday" dataIndex="tuesday" key="tuesday" />
        <Column title="wednesday" dataIndex="wednesday" key="wednesday" />
        <Column title="thursday" dataIndex="thursday" key="thursday" />
        <Column title="friday" dataIndex="friday" key="friday" />
        <Column title="saturday" dataIndex="saturday" key="saturday" />
      </>
    </Table>
  );
};

// {const Schedule}
const onChange = (key: string) => {
  console.log(key);
};

const ClassSchedule = () => {
  const { classes, setClasses } = useDataContext();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Class 10A",
      children: <Schedule1 />,
    },
    {
      key: "2",
      label: "Class 10B",
      children: <Schedule2 />,
    },
    {
      key: "3",
      label: "Class 11A",
      children: <Schedule3 />,
    },
    {
      key: "4",
      label: "Class 11B",
      children: <Schedule4 />,
    },
    {
      key: "5",
      label: "Class 11D",
      children: <Schedule5 />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default ClassSchedule;

// salom

// // import React from "react";
// // import { Table } from "antd";

// // interface MyRecord {
// //   name: string;
// //   // Другие поля записи...
// // }

// // const table_columns = [
// //   {
// //     title: "Name",
// //     dataIndex: "name",
// //     key: "name",
// //     onCell: (record: MyRecord, rowIndex: number) => {
// //       return {
// //         onClick: (ev: React.MouseEvent<HTMLElement>) => {
// //           console.log(record, rowIndex);
// //           // Здесь вы можете обработать нажатие на ячейку
// //         },
// //       };
// //     },
// //   },
// //   // Другие колонки таблицы...
// // ];

// // // Ваш источник данных для таблицы
// // const dataSource = [
// //   {
// //     key: "1",
// //     name: "salom",
// //   },
// // ];

// // const MyTable: React.FC = () => {
// //   return <Table columns={table_columns} dataSource={dataSource} />;
// // };

// // export default MyTable;
