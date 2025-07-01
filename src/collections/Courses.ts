// collections/Courses.ts
import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: ['beginner', 'intermediate', 'advanced', 'expert'],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'modules',
      type: 'relationship',
      relationTo: 'modules',
      hasMany: true,
    },
    {
      name: 'documentation',
      type: 'relationship',
      relationTo: 'documentation',
      hasMany: true,
    },
    {
      name: 'totalPrice',
      type: 'number',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            const extractIDs = (items: any[] | undefined): string[] => {
              if (!Array.isArray(items)) return []
              return items
                .map((item) => {
                  if (typeof item === 'string') return item
                  if (typeof item === 'object' && item?.id) return item.id
                  if (typeof item === 'object' && item?.value) return item.value
                  return null
                })
                .filter(Boolean) as string[]
            }

            const moduleIDs = extractIDs(data?.modules)
            const docIDs = extractIDs(data?.documentation)

            let moduleTotal = 0
            let docTotal = 0

            if (moduleIDs.length > 0) {
              const res = await req.payload.find({
                collection: 'modules',
                where: { id: { in: moduleIDs } },
                limit: moduleIDs.length,
                depth: 0,
              })

              moduleTotal = res.docs.reduce((sum, mod) => sum + (mod.price || 0), 0)
            }

            if (docIDs.length > 0) {
              const res = await req.payload.find({
                collection: 'documentation',
                where: { id: { in: docIDs } },
                limit: docIDs.length,
                depth: 0,
              })

              docTotal = res.docs.reduce((sum, doc) => sum + (doc.price || 0), 0)
            }

            return moduleTotal + docTotal
          },
        ],
      },
    },
  ],
}
