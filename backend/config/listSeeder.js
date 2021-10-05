
import models from '../models'

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

export default seedLists