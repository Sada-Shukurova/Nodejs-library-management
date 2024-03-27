import express from "express";
import dotenv from "dotenv";
import _users from "./users.js";

dotenv.config();
const port = process.env.LIBRARY_MANAGEMENT_PORT;
const app = express();
app.use(express.json());

let users = [..._users];

app.get("/", (req, res) => {
  res.json(users);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((us) => us.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/", (req, res) => {
  users.push(req.body);
  res.status(201).send({ message: "new user created" });
});

app.put("/:id", (req, res) => {
  const id = +req.params.id;
  users = users.map((user) => {
    if (user.id === id) {
      return req.body;
    }
    return user;
  });
  res.status(200).send({ message: "user is updated", id });
});

app.delete("/:id", (req, res) => {
  const id = +req.params.id;
  users = users.filter((us) => us.id !== id);
  res.status(200).send({ message: "user is deleted", id });
});
//
app.patch("/:id", (req, res) => {
  const id = +req.params.id;
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, ...req.body };
    }
    return user;
  });
  res.status(200).send({ message: "user is updated with patch", id });
});
//
app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
