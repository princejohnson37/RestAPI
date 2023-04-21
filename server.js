const express = require("express");
const app = express();
const port = 3000;
const studentRoutes = require("./src/student/routes");

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helo world");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
