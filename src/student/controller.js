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
module.exports = { getStudents, getStudentById };
