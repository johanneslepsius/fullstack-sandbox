import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import models, { connectDB } from './models'
import routes from './routes'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(async (req, res, next) => {
    req.context = {
        models,
    }
    next()
})

app.use('/lists', routes.lists)
app.use('/todos', routes.todos)

const seedLists = async () => {
    const list1 = new models.List({
        name: 'My first List'
    })
    const list2 = new models.List({
        name: 'My other List'
    })
    await list1.save()
    await list2.save()
}

connectDB().then(() => {
    // seedLists()
    app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
})


