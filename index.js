const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request received at: ${new Date()}`);
  console.log(`${req.method} ${req.url}`);
  next();
});
let users = [];
let idCounter = 1;
app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
    time: new Date()
  });
});
app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched",
    data: users,
    time: new Date()
  });
});
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.json({
      message: "Name and email required",
      time: new Date()
    });
  }
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({
      message: "Email already exists",
      time: new Date()
    });
  }

  const newUser = {
    id: idCounter++,
    name,
    email
  };

  users.push(newUser);

  res.json({
    message: "User added",
    data: newUser,
    time: new Date()
  });
});
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.json({
      message: "User not found",
      time: new Date()
    });
  }
  const deletedUser = users.splice(index, 1);
  res.json({
    message: "User deleted",
    data: deletedUser[0],
    time: new Date()
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "All fields required",
      time: new Date()
    });
  }

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      message: "Login Success",
      time: new Date()
    });
  }

  res.json({
    message: "Invalid Credentials",
    time: new Date()
  });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});