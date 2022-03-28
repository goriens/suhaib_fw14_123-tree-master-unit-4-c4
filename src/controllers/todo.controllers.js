const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.models");
const authenticate = require("../middelwares/authenticate");

router.post("", authenticate, async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const todo = await Todo.create(req.body);
        return res.status(200).send(todo);
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
router.get("", async (req, res) => {
    try {
        const todos = await Todo.find()
            .populate({
                path: "userId",
                select: { firstName: 1 }
            })
            .lean().exec();
        return res.status(200).send(todos);
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
router.get("/:id", authenticate, async (req, res) => {
    try {
        const todos = await Todo.findById(req.params.id)
            .populate({
                path: "userId",
                select: { firstName: 1 }
            })
            .lean().exec();
        return res.status(200).send(todos);
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
router.patch("/:id", authenticate, async (req, res) => {
    try {
        const todos = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate({
                path: "userId",
                select: { firstName: 1 }
            })
            .lean().exec();
        return res.status(200).send(todos);
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const todos = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).send(todos);
    }
    catch (err) {
        res.status(401).send({ message: err.message });
    }
});
module.exports = router;