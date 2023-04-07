const students = require("./data/students");
const dayjs = require("dayjs");

//Fonction date 
const formatStudentBirthDates = (students) => {
  return students.map((student) => {
    const formattedBirth = dayjs(student.birth).format("DD/MM/YYYY");
    return {
      ...student,
      birth: formattedBirth,
    };
  });
};

module.exports = formatStudentBirthDates;

