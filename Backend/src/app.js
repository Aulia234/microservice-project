const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/patients", require("./routes/patient.routes"));

app.get("/", (req, res) => {
  res.send("Backend jalan 🚀");
});

module.exports = app;

