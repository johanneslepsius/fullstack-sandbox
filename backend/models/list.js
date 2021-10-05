import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
)

listSchema.pre('remove', function (next) {
    this.model('Message').deleteMany({ list: this._id }, next)
})

const List = mongoose.model('List', listSchema)

export default List