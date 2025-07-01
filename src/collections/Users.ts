// collections/Users.ts
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
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
      name: 'company_name',
      type: 'text',
    },
    {
      name: 'profile_pic',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order_history',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subscription_plan',
      type: 'relationship',
      relationTo: 'subscription-plans',
    },
  ],
}
