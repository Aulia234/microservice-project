require("dotenv").config();

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

const app = require("./src/app");

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
