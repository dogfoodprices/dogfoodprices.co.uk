export default {
  name: 'sellerDetails',
  title: 'Seller details',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'website',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website'
    }
  }
};
