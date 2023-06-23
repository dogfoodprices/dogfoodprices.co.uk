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
      name: 'sellerDetails.name',
      include: 'sellerDetails.include'
    },
    prepare({name, include}) {
      const icon = include ? '🟢' : '🔴'
      return {
        title: `${icon} ${name}`,
      };
    },
  },
};
