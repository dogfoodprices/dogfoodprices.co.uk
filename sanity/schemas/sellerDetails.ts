export default {
  name: 'sellerDetails',
  title: 'Seller details',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'website',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'include',
      title: 'Include on website',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }
  ],
  initialValue: {
    include: true,
  },
  preview: {
    select: {
      title: 'name',
      subtitle: 'website',
    },
  },
};
