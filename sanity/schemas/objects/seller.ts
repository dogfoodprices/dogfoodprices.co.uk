export default {
  name: 'seller',
  title: 'Seller',
  type: 'object',
  fields: [
    {
      name: 'sellerDetails',
      type: 'reference',
      to: [
        {
          type: 'sellerDetails',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'prices',
      type: 'array',
      of: [
        {
          type: 'price',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'sellerDetails.name',
    },
  },
};
