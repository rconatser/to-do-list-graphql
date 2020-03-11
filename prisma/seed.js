import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prismaClient = new PrismaClient()

const items = fs.readFileSync('prisma/example_files/items.json')

function loadItems() {
  const item = JSON.parse(items)
  const allItems = item
  const itemTag = allItems.filter(
    item =>
      item.tags === tagEntry
  )
  return allItems.map(itm => {
    return {
      data: {
        title: itm.title,
        content: itm.content,
        priority: itm.priority,
        dueDate: itm.dueDate,
        tags: itm.tags || "Uncategorized",
      },
    }
  })
}

async function main() {
  try {
    const allItems = loadItems()
    for (let itm of allItems) {
      await prismaClient.item.create(itm)
      .catch(err => console.log(`Error trying to create To Do Item: ${err} item ${itm}`))
    }
  } catch (err) {
    console.log(err)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect()
  })
