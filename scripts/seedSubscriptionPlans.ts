import { getPayload } from 'payload'
import dotenv from 'dotenv'
import payloadConfig from '../src/payload.config' // 👈 import config jako obiekt

dotenv.config()

const seed = async () => {
  const payload = await getPayload({
    config: payloadConfig, // ✅ poprawny typ
  })

  const plans = [
    { name: 'free' as const, price: 0 },
    { name: 'basic' as const, price: 45 },
    { name: 'advanced' as const, price: 95 },
    { name: 'corporate' as const, price: 2500 },
  ]

  for (const plan of plans) {
    const exists = await payload.find({
      collection: 'subscription-plans',
      where: { name: { equals: plan.name } },
    })

    if (!exists.docs.length) {
      await payload.create({
        collection: 'subscription-plans',
        data: { ...plan },
      })
      console.log(`✓ Created: ${plan.name}`)
    } else {
      console.log(`– Skipped: ${plan.name} (already exists)`)
    }
  }

  process.exit()
}

seed()
