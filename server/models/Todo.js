import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        priority: {
            type: String,
            enum: ["LOW", "MED", "HIGH"],
            default: "MED"
        },

        date: {
            type: String,
            default: ""
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;