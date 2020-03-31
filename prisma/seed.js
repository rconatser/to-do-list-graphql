import { PrismaClient } from '@prisma/client';
import { tasks } from './task-seed.js';

const prismaClient = new PrismaClient();

const AllTasks = tasks.map(task => {
    return {
        data: {
            title: task.title || "",
            content: task.content || "",
            dueDate: task.dueDate || "",
            priority: task.priority || "",
            tags: task.tags || "",
            createdAt: task.createdAt || "",
            updatedAt: task.updatedAt || "",
            id: task.id || ""
        }
    };
});

async function main() {
    try {
        for (let task of AllTasks) {
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