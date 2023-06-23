const priceTypes = ['One-off', 'Subscription', 'Subscription (first order)'];
export default {
  name: 'price',
  title: 'Price',
  type: 'object',
  fields: [
    {
      name: 'weight',
      type: 'number',
    },
    {
      name: 'quantity',
      type: 'number',
    },
    {
      name: 'type',
      type: 'string',
      options: {
        list: ['One-off', 'Subscription', 'Subscription (first order)'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'lastChecked',
      title: 'Last checked',
      type: 'date',
      validation: (Rule) => Rule.required().warning(),
    },
    {
      name: 'lastChanged',
      title: 'Last changed',
      type: 'date',
      validation: (Rule) => Rule.required().warning(),
    },
  ],
  preview: {
    select: {
      weight: 'weight',
      quantity: 'quantity',
      type: 'type',
      price: 'price',
    },
    prepare({weight, quantity, type, price}) {
      if (!price) {
        price = 'Out of stock';
      } else {
        price = `£${price}`;
      }

      let weightDisplay = `${weight}kg`;
      if (quantity > 1) {
        weightDisplay = `${quantity} x ${weight}kg (${quantity * weight}kg)`;
      }
      return {
        title: `${weightDisplay} · ${price}`,
        subtitle: type,
      };
    },
  },
  // initialValue: {
  //   quantity: 1,
  //   type: 'One-off',
  //   lastChecked: new Date().toISOString().split('T')[0],
  //   lastChanged: new Date().toISOString().split('T')[0],
  // },
};
