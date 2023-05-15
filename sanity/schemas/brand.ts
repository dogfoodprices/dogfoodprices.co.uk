export default {
  name: 'brand',
  title: 'Brands',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
