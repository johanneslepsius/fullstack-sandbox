import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
    const todo = await req.context.models.Todo.create({
        content: req.body.content,
        completed: req.body.completed,
        listId: req.body.listId,
    })
    return res.send(todo)
})

router.put("/:todoId", async (req, res) => {
    const todo = await req.context.models.Todo.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        { new: true }
    )
    return res.send(todo)
})

router.delete('/:todoId', async (req, res) => {
    const todo = await req.context.models.Todo.findByIdAndRemove(
        req.params.todoId
    )

    return res.send(todo)
})

export default router