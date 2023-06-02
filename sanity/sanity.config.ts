import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {structure} from './deskStructure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'dogfoodprices.co.uk',

  projectId: '9vyslszl',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
