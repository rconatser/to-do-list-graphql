import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({
	definition(t) {
		t.field('Task', {
			type: 'Task',
			nullable: true,
			args: { id: idArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.task.findOne({
					where: {
						id,
					},
				})
			}
		})

		t.list.field('Tasks', {
			type: 'Task',
			args: {
				searchString: stringArg({ nullable: true }),
			},
			resolve: (parent, { searchString }, ctx) => {
				return ctx.prisma.task.findMany({
					where: {
						OR: [
							{ title: { contains: searchString } },
							{ content: { contains: searchString } },
							{ dueDate: { contains: searchString } },
							{ priority: { contains: searchString } },
							{ tags: { contains: searchString } },
							{ createdBy: { contains: searchString } }
						],
					},
				})
			}
		})

		t.field('User', {
			type: 'User',
			nullable: true,
			args: { id: idArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.user.findOne({
					where: {
						id,
					},
				})
			}
		})

		t.list.field('Users', {
			type: 'User',
			args: {
				searchString: stringArg({ nullable: true }),
			},
			resolve: (parent, { searchString }, ctx) => {
				return ctx.prisma.user.findMany({
					where: {
						OR: [
							{ name: { contains: searchString } },
							{ email: { contains: searchString } },
							{ lives: { contains: searchString } }
						],
					},
				})
			}
		})

	}
})