// collections/Orders.ts
import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'user',
  },
  access: {
    create: () => true, // ← umożliwiamy seederowi tworzenie orderów
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Module', value: 'module' },
            { label: 'Documentation', value: 'documentation' },
          ],
          required: true,
        },
        {
          name: 'item',
          type: 'relationship',
          relationTo: ['modules', 'documentation'],
          required: true,
          // ❗️Umożliwia użycie { relationTo, value } w seederze/API
          hasMany: false,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
  ],
}
