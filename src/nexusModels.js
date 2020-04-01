import { objectType } from 'nexus'

const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.content()
    t.model.priority()
    t.model.tags()
	t.model.dueDate()
	t.model.createdBy()
  }
})

const User = objectType({
	name: 'User',
	definition(t) {
	  t.model.id()
	  t.model.createdAt()
	  t.model.updatedAt()
	  t.model.name()
	  t.model.email()
	  t.model.lives()
	}
})

export const Models = [
  Task,
  User
]