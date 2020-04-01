import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prismaClient = new PrismaClient();
const tasks = fs.readFileSync('prisma/tasks.json')

function allTasks() {
	const list = JSON.parse(tasks);
	
	return list.map(task => {
		return {
			data: {
				title: task.title || "No Title",
				content: task.content || "No Description",
				dueDate: task.dueDate || "No Date",
				priority: task.priority || "Low",
				tags: task.tags || "No Tags"
			}
		}
	})
}

async function main() {
    try {
        for (let task of allTasks) {
            await prismaClient.task.create(task)
                .catch(err => console.log(`Error trying to create Task: ${err} - ${task}`))
        }
    } catch (err) {
        console.log(err)
    }
}

main().catch(e => console.error(e)).finally(async () => {
    await prismaClient.disconnect()
})