import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prismaClient = new PrismaClient()

const items = fs.readFileSync('prisma/example_files/uvu_courses.json')

function loadUVUCourses() {
  const item = JSON.parse(items)
  const allItems = catalog.comet.course
  const itemTag = allItems.filter(
    course =>
      course.prefix._text === 'DGM' ||
      course.prefix._text === 'CS' ||
      course.prefix._text === 'IT' ||
      course.prefix._text === 'INFO',
  )
  return dgmCourses.map(crs => {
    return {
      data: {
        name: crs.title._text,
        description: crs.description._text,
        defaultCredits: crs.totalCredits._text,
        courseCode: `${crs.prefix._text} ${crs.number._text}`,
        termsOffered: crs.termsOffered._text || "Fall",
      },
    }
  })
}

async function main() {
  try {
    const allCourses = loadUVUCourses()
    for (let crs of allCourses) {
      await prismaClient.course.create(crs)
      .catch(err => console.log(`Error trying to create UVU courses: ${err} course ${crs}`))
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
