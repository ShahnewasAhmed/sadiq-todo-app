import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();

        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("Received task:", req.body);

        const todo = await Todo.create(req.body);

        console.log("Created task:", todo);

        res.status(201).json(todo);

    } catch (error) {
        console.error("Create todo error:", error);

        res.status(500).json({
            message: "Failed to create todo",
            error: error.message
        });
    }
});

router.delete("/", async (req, res) => {
    try {

        await Todo.deleteMany({});

        res.json({
            message: "All todos deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete all todos"
        });

    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json({
            message: "Todo deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

export default router;