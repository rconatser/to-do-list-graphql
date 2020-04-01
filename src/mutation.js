import { idArg, mutationType, stringArg } from 'nexus';

export const Mutation = mutationType({
	name: 'Mutation',
	definition(t) {

	t.crud.deleteOneTask()
	t.crud.createOneTask()
	t.crud.updateOneTask()

	t.crud.deleteOneUser()
	t.crud.createOneUser()
	t.crud.updateOneUser()

	}
})