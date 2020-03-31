import { idArg, mutationType, stringArg } from 'nexus';

export const Mutation = mutationType({
	name: 'Mutation',
	definition(t) {
		
		t.crud.deleteOneTask()

		t.field('createTask', {
			type: 'Task',
			args: {
				title: stringArg({ nullable: false }),
				content: stringArg(),
				dueDate: stringArg({ nullable: false }),
				priority: stringArg(),
				tags: stringArg()
			},
			resolve: (parent, { title, content, dueDate, priority, tags }, ctx) => {
				return ctx.prisma.task.create({
					data: {
						title,
						content,
						dueDate,
						priority,
						tags
					}
				})
			}
		})

		t.field('updateTask', {
			type: 'Task',
			args: {
				id: idArg(),
				title: stringArg(),
				content: stringArg(),
				dueDate: stringArg(),
				priority: stringArg(),
				tags: stringArg()
			},
			resolve: (parent, { id, title, content, dueDate, priority, tags }, ctx) => {
				return ctx.prisma.task.update({
					where: {
						id
					},
					data: {
						title,
						content,
						dueDate,
						priority,
						tags
					}
				})
			}
		})
	}
})