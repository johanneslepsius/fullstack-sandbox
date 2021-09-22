import mongoose from "mongoose"

import Todo from "./todo"
import List from "./list"

const connectDB = () => {
    return mongoose.connect(process.env.DB_URL)
}

const models = { Todo, List }

export { connectDB }

export default models