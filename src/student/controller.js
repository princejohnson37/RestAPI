const pool = require("../../db");
const queries = require("./querries");

const getStudents = (req, res) => {
  // console.log("getting students data");
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  console.log(req.body);
  const { name, email, age, dob } = req.body;
  // check if emeail already exists in db
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists");
    } else {
      //add student to db
      pool.query(
        queries.addStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Student Created Succesfully");
        }
      );
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student doesn't exist in database");
    } else {
      pool.query(queries.deleteStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student deleted sucessfully");
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student doesn't exist in database");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated sucessfully");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
