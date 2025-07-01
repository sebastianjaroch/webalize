// payload.config.ts
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Modules } from './collections/Modules'
import { Documentation } from './collections/Documentation'
import { DocumentationRequests } from './collections/DocumentationRequests'
import { Orders } from './collections/Orders'
import { Cart } from './collections/Cart'
import { SubscriptionPlans } from './collections/SubscriptionPlans'
import { Newsletter } from './collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Courses,
    Modules,
    Documentation,
    DocumentationRequests,
    Orders,
    Cart,
    SubscriptionPlans,
    Newsletter,
  ],
  editor: lexicalEditor(),
  secret: 'a038fc036bbc4417d1057fa5' || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString:
        'postgres://neondb_owner:npg_qHQWElPY8bZ2@ep-jolly-salad-a2825nwe-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        // If you have another collection that supports uploads, you can add it below
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
