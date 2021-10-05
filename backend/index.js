import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import connectDB from './config/db'
import models from './models'
import routes from './routes'
import seedLists from './config/listSeeder'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    req.context = {
        models,
    }
    next()
})

app.use('/lists', routes.lists)
app.use('/todos', routes.todos)

;(async () => {
    await connectDB()
    if (!models.List.exists()) {
        seedLists()
    }
    app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
})()


