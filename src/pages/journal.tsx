import { Table } from "antd";
import { useDataContext } from "./StudentContext";

export interface IJournal {
  id: number;
  Firstname: string;
  Lastname: string;
  math: number[];
}
const columns = [
  {
    title: "firstname",
    dataIndex: "Firstname",
    key: 1,
  },
  {
    title: "lastname",
    dataIndex: "Lastname",
    key: 2,
  },
  {
    title: "math",
    dataIndex: "math",
    key: 1,
  },
];

function Journal() {
  const {
    students,
    setStudents,
    teachers,
    setTeachers,
    classes,
    setClasses,
    journal,
    setJournal,
  } = useDataContext();

  return (
    <div>
      <Table dataSource={journal} columns={columns} />
    </div>
  );
}

export default Journal;
