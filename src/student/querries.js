const getStudents = "SELECT * FROM STUDENTS";
const getStudentById = "SELECT * FROM STUDENTS WHERE id = $1";

module.exports = {
  getStudents,
  getStudentById,
};
