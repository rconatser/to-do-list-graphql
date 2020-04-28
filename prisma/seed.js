import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prismaClient = new PrismaClient();
const tasks = fs.readFileSync('prisma/tasks.json')
const users = fs.readFileSync('prisma/users.json')

function allTasks() {
	const list = JSON.parse(tasks);
	
	return list.tasks.map(task => {
		return {
			data: {
				title: task.title || "No Title",
				content: task.content || "No Description",
				dueDate: task.dueDate || "No Date",
				priority: task.priority || "Low",
				tags: task.tags || "No Tags",
				createdBy: task.createdBy || "John Doe"
			}
		}
	})
}

function allUsers() {
	const listUsers = JSON.parse(users);
	
	return listUsers.users.map(user => {
		return {
			data: {
				name: user.name || "John Doe",
				email: user.email || "No Email",
				lives: user.lives || "No Location"
			}
		}
	})
}

async function main() {
	let manyUsers = allUsers();
	let manyTasks = allTasks();
    try {
		for (let task of manyTasks) {
			await prismaClient.task.create(task)
				.catch(err => console.log(`Error trying to create Task: ${err} - ${task}`))
		}
		for (let user of manyUsers) {
            await prismaClient.user.create(user)
				.catch(err => console.log(`Error trying to create User: ${err} - ${user}`))
		}
		console.log("Database was Seeded");
    } catch (err) {
        console.log(err)
	}
}

main().catch(e => console.error(e)).finally(async () => {
    await prismaClient.disconnect()
})