const express = require("express");
const app = express();

app.use(express.json());

// ================== CUSTOM MIDDLEWARE ==================
app.use((req, res, next) => {
  console.log(`Request received at: ${new Date()}`);
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================== DATA ==================
let users = [];
let idCounter = 1;

// ================== ROOT ROUTE ==================
app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
    time: new Date()
  });
});

// ================== GET ALL USERS ==================
app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched",
    data: users,
    time: new Date()
  });
});

// ================== ADD USER ==================
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.json({
      message: "Name and email required",
      time: new Date()
    });
  }

  // Check duplicate email
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

// ================== DELETE USER ==================
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

// ================== BONUS: GET USER BY ID ==================
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.json({
      message: "User not found",
      time: new Date()
    });
  }

  res.json({
    message: "User found",
    data: user,
    time: new Date()
  });
});

// ================== LOGIN ==================
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

// ================== SERVER ==================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});