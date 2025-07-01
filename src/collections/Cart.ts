// collections/Cart.ts
import { CollectionConfig } from 'payload'

export const Cart: CollectionConfig = {
  slug: 'cart',
  admin: {
    useAsTitle: 'user',
    hidden: true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Module', value: 'module' },
            { label: 'Documentation', value: 'documentation' },
          ],
        },
        {
          name: 'item',
          type: 'relationship',
          relationTo: ['modules', 'documentation'],
          required: true,
        },
      ],
    },
  ],
}
