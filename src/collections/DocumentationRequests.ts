// collections/DocumentationRequests.ts
import { CollectionConfig } from 'payload'

export const DocumentationRequests: CollectionConfig = {
  slug: 'documentation-requests',
  admin: {
    useAsTitle: 'company_email',
  },
  access: {
    create: () => false,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    { name: 'name', type: 'text', required: true },
    { name: 'surname', type: 'text', required: true },
    { name: 'company_email', type: 'email', required: true },
    { name: 'job_title', type: 'text', required: true },
    { name: 'company_name', type: 'text', required: true },
    { name: 'vat_number', type: 'text', required: true },
    { name: 'country_of_registration', type: 'text', required: true },
    { name: 'street_name', type: 'text', required: true },
    { name: 'building_number', type: 'text', required: true },
    { name: 'apartment_number', type: 'text' }, // opcjonalne
    { name: 'zip_code', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
  ],
}
