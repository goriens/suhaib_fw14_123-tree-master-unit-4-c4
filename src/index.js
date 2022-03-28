const express = require("express");
const connect = require("./configs/db");
const { register, login, newToken } = require("./controllers/auth.controllers");
const userController = require("./controllers/user.controllers");
const todoController = require("./controllers/todo.controllers");

const app = express();
app.use(express.json());

app.use("/users", userController);
app.use("/todos", todoController);
app.post("/register", register);
app.post("/login", login);


app.listen(5000, () => {
    try {
        connect();
        console.log("Listening on port 5000");
    } catch (err) {
        console.log(err.message);
    }
});