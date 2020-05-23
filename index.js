// Express config
const express = require("express");
const app = express();

// System deps
const path = require("path");
const fs = require("fs");

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Body parser config
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Student = require("./db/Student");
const student = new Student();

app.get("/students", (req, res) => {
  res.json(student.all());
});

app.get("/students/:id", (req, res) => {
  const oneStudent = student.one(req.params.id);

  if (student) {
    return res.json(oneStudent);
  }

  res
  .status(404)
  .json({error: "Student not found"});
});

app.post("/students", (req, res) => {
  const newStudent = student.create(req.body);

  res.json(newStudent);
});

app.put("/students/:id", (req, res) => {
  student.update(req.params.id, req.body);

  res.sendStatus(200);
});

app.delete("/students/:id", (req, res) => {
  student.destroy(req.params.id);

  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
