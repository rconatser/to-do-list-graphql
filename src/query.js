import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('Task', {
      type: 'Task',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.Task.findOne({
          where: {
            id,
          },
        })
      }
    })

    t.list.field('Tasks', {
      type: 'Task',
      args: {
        searchString: stringArg({ nullable: true}),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.task.findMany({
          where: {
            OR: [
              { title: { contains: searchString }},
			  { content: { contains: searchString }},
			  { dueDate: { contains: searchString }},
			  { priority: { contains: searchString }},
			  { tags: { contains: searchString }}
            ],
          },
        })
      }
    })

  }
})