import { objectType } from 'nexus'

const Item = objectType({
  name: 'Item',
  definition(t) {
    t.item.id()
    t.item.createdAt()
    t.item.updatedAt()
    t.item.title()
    t.item.content()
    t.item.priority()
    t.item.tags()
    t.item.dueDate()
  }
})

export const Items = [
  Item
]