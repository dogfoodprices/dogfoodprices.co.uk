import type {Rule} from '@sanity/types'

async function getNameForBrandReference(id: string, context: {getClient: any}) {
  const {getClient} = context
  const client = getClient({apiVersion: '2023-05-01'})
  const query = '*[_type=="brand" && _id == $id][0]{name}'
  const params = {id: id}
  return client.fetch(query, params).then((brand: {name: string}) => {
    return brand.name
  })
}

export default {
  name: 'food',
  title: 'Foods',
  type: 'document',
  fields: [
    {
      name: 'brand',
      type: 'reference',
      to: [
        {
          type: 'brand',
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: async (doc: {brand: {_ref: string}; name: string}, context: {getClient: any}) => {
          const brandName = await getNameForBrandReference(doc.brand._ref, context)
          return `${brandName}-${doc.name}`
        },
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'allAboutDogFoodUrl',
      title: 'AllAboutDogFood URL',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Images',
      name: 'images',
      type: 'object',
      fields: [
        {
          title: 'Front',
          name: 'front',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          title: 'Back',
          name: 'back',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'sellers',
      type: 'array',
      of: [
        {
          type: 'seller',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      media: 'images.front',
    },
  },
}
