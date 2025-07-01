// scripts/seedDemoData.ts
import { getPayload } from 'payload'
import dotenv from 'dotenv'
import payloadConfig from '../src/payload.config'
import { faker } from '@faker-js/faker'

dotenv.config()

/* -------------------------------------------------------------------------- */
/* Typy pomocnicze                                                            */
/* -------------------------------------------------------------------------- */
type ProductItem =
  | {
      type: 'module'
      item: { relationTo: 'modules'; value: number }
    }
  | {
      type: 'documentation'
      item: { relationTo: 'documentation'; value: number }
    }

/* -------------------------------------------------------------------------- */
/* Seeder                                                                     */
/* -------------------------------------------------------------------------- */
const seed = async () => {
  /* 0. Inicjalizacja Payloada ------------------------------------------------ */
  const payload = await getPayload({ config: payloadConfig })

  /* 1. Newsletter ----------------------------------------------------------- */
  const newsletterEmails = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
  }))

  await Promise.all(
    newsletterEmails.map((data) => payload.create({ collection: 'newsletter', data })),
  )

  /* 2. Users ---------------------------------------------------------------- */
  const users: { id: number }[] = []

  for (let i = 0; i < 10; i++) {
    const user = await payload.create({
      collection: 'users',
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'test1234',
      },
    })

    users.push({ id: user.id as number })
  }

  /* 3. Orders --------------------------------------------------------------- */
  const courses = {
    course1: {
      modules: [1, 2],
      documentation: [1],
    },
    course2: {
      modules: [3],
      documentation: [2],
    },
  }

  const sampleUsers = users.slice(0, 7)

  for (const user of sampleUsers) {
    const course = faker.helpers.arrayElement([courses.course1, courses.course2])

    const modProducts: ProductItem[] = course.modules.map((id) => ({
      type: 'module',
      item: { relationTo: 'modules', value: id },
    }))

    const docProducts: ProductItem[] = course.documentation.map((id) => ({
      type: 'documentation',
      item: { relationTo: 'documentation', value: id },
    }))

    const products: ProductItem[] = [...modProducts, ...docProducts]

    await payload.create({
      collection: 'orders',
      data: {
        user: user.id,
        products,
        status: 'paid',
        amount: faker.number.int({ min: 100, max: 500 }),
        date: faker.date.past({ years: 1 }).toISOString(), // ISO-string!
      },
    })
  }

  /* 4. Documentation requests ---------------------------------------------- */
  for (let i = 0; i < 3; i++) {
    const user = faker.helpers.arrayElement(users)

    await payload.create({
      collection: 'documentation-requests',
      data: {
        user: user.id,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        company_email: faker.internet.email(),
        job_title: faker.person.jobTitle(),
        company_name: faker.company.name(),
        vat_number: faker.string.alphanumeric(10),
        country_of_registration: faker.location.country(),
        street_name: faker.location.street(),
        building_number: faker.string.numeric(2),
        apartment_number: faker.string.numeric(2),
        zip_code: faker.location.zipCode(),
        city: faker.location.city(),
      },
    })
  }

  console.log('✓ Demo data seeded successfully.')
  process.exit()
}

/* -------------------------------------------------------------------------- */
/* Uruchomienie                                                               */
/* -------------------------------------------------------------------------- */
seed()
