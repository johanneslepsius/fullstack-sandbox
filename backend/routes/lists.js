import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    const lists = await req.context.models.List.find()
    return res.send(lists)
})

router.get('/:listId', async (req, res) => {
    const todos = await req.context.models.Todo.find({
        listId: req.params.listId,
    })
    return res.send(todos)
})

export default router