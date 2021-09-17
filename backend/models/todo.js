import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
            required: true
        },
    },
    { timestamps: true },
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo