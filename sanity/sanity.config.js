import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {FetchDoiAction} from './actions/fetchDoiAction'

export default defineConfig({
  name: 'default',
  title: 'Research Website',

  projectId: '3w49e1s5',
  dataset: 'production',

  // The change is inside the plugins array
  plugins: [
    structureTool({
      document: {
        actions: (prev, context) => {
          // For the 'publication' document type, add our custom action
          // to the default array of actions
          return context.schemaType === 'publication'
            ? [...prev, FetchDoiAction]
            : prev
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})