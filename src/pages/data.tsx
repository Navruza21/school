import { ClassType } from "./classes";
import { ScheduleType } from "./schedule";
import { Student } from "./students";
import { Teacher } from "./teachers";

export const studentsData: Student[] = [
  {
    id: 1,
    firstName: "Ali",
    lastName: "Valiyev",
    classId: 1,
    address: "Tashkent",
    phone: "998901234567",
    reyting: 85,
  },
  {
    id: 2,
    firstName: "Sara",
    lastName: "Khalilova",
    classId: 1,
    address: "Samarkand",
    phone: "998901234568",
    reyting: 90,
  },
  {
    id: 3,
    firstName: "Javlon",
    lastName: "Jumayev",
    classId: 1,
    address: "Bukhara",
    phone: "998901234569",
    reyting: 65,
  },
  {
    id: 4,
    firstName: "Zara",
    lastName: "Nazarova",
    classId: 1,
    address: "Andijan",
    phone: "998901234570",
    reyting: 80,
  },
  {
    id: 5,
    firstName: "Dmitriy",
    lastName: "Petrov",
    classId: 2,
    address: "Fergana",
    phone: "998901234571",
    reyting: 95,
  },
  {
    id: 6,
    firstName: "Nargiza",
    lastName: "Umarova",
    classId: 3,
    address: "Namangan",
    phone: "998901234572",
    reyting: 90,
  },
  {
    id: 7,
    firstName: "Bekzod",
    lastName: "Askarov",
    classId: 3,
    address: "Jizzakh",
    phone: "998901234573",
    reyting: 70,
  },
  {
    id: 8,
    firstName: "Shirin",
    lastName: "Raxmatova",
    classId: 3,
    address: "Nukus",
    phone: "998901234574",
    reyting: 60,
  },
  {
    id: 9,
    firstName: "Sardor",
    lastName: "Ganiev",
    classId: 3,
    address: "Gulistan",
    phone: "998901234575",
    reyting: 85,
  },
  {
    id: 10,
    firstName: "Dilorom",
    lastName: "Murodova",
    classId: 3,
    address: "Kokand",
    phone: "998901234576",
    reyting: 80,
  },
  {
    id: 11,
    firstName: "Kamron",
    lastName: "Akbarov",
    classId: 4,
    address: "Khorezm",
    phone: "998901234577",
    reyting: 88,
  },
  {
    id: 12,
    firstName: "Gulnora",
    lastName: "Jumaboyeva",
    classId: 4,
    address: "Qarshi",
    phone: "998901234578",
    reyting: 74,
  },
  {
    id: 13,
    firstName: "Olim",
    lastName: "Ibragimov",
    classId: 5,
    address: "Tashkent",
    phone: "998901234579",
    reyting: 92,
  },
  {
    id: 14,
    firstName: "Lola",
    lastName: "Saidova",
    classId: 1,
    address: "Samarkand",
    phone: "998901234580",
    reyting: 69,
  },
  {
    id: 15,
    firstName: "Sherzod",
    lastName: "Toshmatov",
    classId: 1,
    address: "Bukhara",
    phone: "998901234581",
    reyting: 78,
  },
];

export const teachersData: Teacher[] = [
  {
    id: 1,
    firstName: "Aziz",
    lastName: "Rakhimov",
    classId: 1,
    address: "Tashkent",
    email: "aziz@example.com",
    phone: "998901234601",
    subject: "Mathematics",
    reyting: 70,
  },
  {
    id: 2,
    firstName: "Gulnoza",
    lastName: "Sattarova",
    classId: 2,
    address: "Samarkand",
    email: "gulnoza@example.com",
    phone: "998901234602",
    subject: "Physics",
    reyting: 85,
  },
  {
    id: 3,
    firstName: "Jamshid",
    lastName: "Nazarov",
    classId: 3,
    address: "Bukhara",
    email: "jamshid@example.com",
    phone: "998901234603",
    subject: "Chemistry",
    reyting: 80,
  },
  {
    id: 4,
    firstName: "Dilshoda",
    lastName: "Mustafayeva",
    classId: 4,
    address: "Andijan",
    email: "dilshoda@example.com",
    phone: "998901234604",
    subject: "Biology",
    reyting: 85,
  },
  {
    id: 5,
    firstName: "Rustam",
    lastName: "Olimov",
    classId: 5,
    address: "Fergana",
    email: "rustam@example.com",
    phone: "998901234605",
    subject: "History",
    reyting: 95,
  },
];

export const classesData: ClassType[] = [
  {
    id: 1,
    name: "Class 10A",
    teacher: "Aziz Rakhimov",
    schedule: "Schedule1",
  },
  {
    id: 2,
    name: "Class 10B",
    teacher: "Gulnoza Sattarova",
    schedule: "Schedule2",
  },
  {
    id: 3,
    name: "Class 11A",
    teacher: "Jamshid Nazarov",
    schedule: "Schedule3",
  },
  {
    id: 4,
    name: "Class 11B",
    teacher: "Dilshoda Mustafayeva",
    schedule: "Schedule4",
  },
  {
    id: 5,
    name: "Class 11D",
    teacher: "Rustam Olimov",
    schedule: "Schedule5",
  },
];

export const ScheduleData: ScheduleType[] =
  //  [
  [
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
// [
//   {
//     key: "1",
//     classId: 2,
//     time: "08:00 - 08:45",
//     monday: "Physics",
//     tuesday: "Physics",
//     wednesday: "Chemistry",
//     thursday: "",
//     friday: "History",
//     saturday: "Mathematics",
//   },
//   {
//     key: "2",
//     classId: 2,
//     time: "08:50 - 09:35",
//     monday: "Chemistry",
//     tuesday: "",
//     wednesday: "Biology",
//     thursday: "History",
//     friday: "Mathematics",
//     saturday: "Physics",
//   },
//   {
//     key: "3",
//     classId: 2,
//     time: "09:40 - 10:25",
//     monday: "",
//     tuesday: "Mathematics",
//     wednesday: "Physics",
//     thursday: "Chemistry",
//     friday: "Biology",
//     saturday: "History",
//   },
//   {
//     key: "4",
//     classId: 2,
//     time: "10:30 - 11:15",
//     monday: "History",
//     tuesday: "History",
//     wednesday: "Mathematics",
//     thursday: "Physics",
//     friday: "Chemistry",
//     saturday: "",
//   },
//   {
//     key: "5",
//     classId: 2,
//     time: "11:20 - 12:05",
//     monday: "Biology",
//     tuesday: "Biology",
//     wednesday: "",
//     thursday: "Mathematics",
//     friday: "Physics",
//     saturday: "Chemistry",
//   },
//   // Boshqa fanlar...
// ],
// [
//   {
//     key: "1",
//     classId: 3,
//     time: "08:00 - 08:45",
//     monday: "Chemistry",
//     tuesday: "Chemistry",
//     wednesday: "Biology",
//     thursday: "History",
//     friday: "Mathematics",
//     saturday: "",
//   },
//   {
//     key: "2",
//     classId: 3,
//     time: "08:50 - 09:35",
//     monday: "",
//     tuesday: "History",
//     wednesday: "Mathematics",
//     thursday: "Physics",
//     friday: "Chemistry",
//     saturday: "Biology",
//   },
//   {
//     key: "3",
//     classId: 3,
//     time: "09:40 - 10:25",
//     monday: "",
//     tuesday: "Biology",
//     wednesday: "History",
//     thursday: "Mathematics",
//     friday: "Physics",
//     saturday: "Chemistry",
//   },
//   {
//     key: "4",
//     classId: 3,
//     time: "10:30 - 11:15",
//     monday: "Mathematics",
//     tuesday: "Mathematics",
//     wednesday: "Physics",
//     thursday: "",
//     friday: "Biology",
//     saturday: "",
//   },
//   {
//     key: "5",
//     classId: 3,
//     time: "11:20 - 12:05",
//     monday: "Physics",
//     tuesday: "",
//     wednesday: "Chemistry",
//     thursday: "Biology",
//     friday: "History",
//     saturday: "Mathematics",
//   },
//   // Boshqa fanlar...
// ],
// [
//   {
//     key: "1",
//     classId: 4,
//     time: "08:00 - 08:45",
//     monday: "Mathematics",
//     tuesday: "Mathematics",
//     wednesday: "",
//     thursday: "Chemistry",
//     friday: "Biology",
//     saturday: "History",
//   },
//   {
//     key: "2",
//     classId: 4,
//     time: "08:50 - 09:35",
//     monday: "",
//     tuesday: "Physics",
//     wednesday: "Chemistry",
//     thursday: "Biology",
//     friday: "History",
//     saturday: "Mathematics",
//   },
//   {
//     key: "3",
//     classId: 4,
//     time: "09:40 - 10:25",
//     monday: "Chemistry",
//     tuesday: "Chemistry",
//     wednesday: "Biology",
//     thursday: "",
//     friday: "Mathematics",
//     saturday: "Physics",
//   },
//   {
//     key: "4",
//     classId: 4,
//     time: "10:30 - 11:15",
//     monday: "Biology",
//     tuesday: "",
//     wednesday: "History",
//     thursday: "Mathematics",
//     friday: "Physics",
//     saturday: "Chemistry",
//   },
//   {
//     key: "5",
//     classId: 4,
//     time: "11:20 - 12:05",
//     monday: "",
//     tuesday: "History",
//     wednesday: "Mathematics",
//     thursday: "Physics",
//     friday: "Chemistry",
//     saturday: "",
//   },
//   // Boshqa fanlar...
// ],
// [
//   {
//     key: "1",
//     classId: 5,
//     time: "08:00 - 08:45",
//     monday: "Mathematics",
//     tuesday: "Mathematics",
//     wednesday: "Physics",
//     thursday: "Chemistry",
//     friday: "",
//     saturday: "History",
//   },
//   {
//     key: "2",
//     classId: 5,
//     time: "08:50 - 09:35",
//     monday: "",
//     tuesday: "Physics",
//     wednesday: "Chemistry",
//     thursday: "Biology",
//     friday: "History",
//     saturday: "Mathematics",
//   },
//   {
//     key: "3",
//     classId: 5,
//     time: "09:40 - 10:25",
//     monday: "Chemistry",
//     tuesday: "Chemistry",
//     wednesday: "Biology",
//     thursday: "",
//     friday: "Mathematics",
//     saturday: "Physics",
//   },
//   {
//     key: "4",
//     classId: 5,
//     time: "10:30 - 11:15",
//     monday: "Biology",
//     tuesday: "",
//     wednesday: "History",
//     thursday: "Mathematics",
//     friday: "Physics",
//     saturday: "Chemistry",
//   },
//   {
//     key: "5",
//     classId: 5,
//     time: "11:20 - 12:05",
//     monday: "History",
//     tuesday: "History",
//     wednesday: "Mathematics",
//     thursday: "Physics",
//     friday: "Chemistry",
//     saturday: "",
//   },
//   // Boshqa fanlar...
// ],
// ];
