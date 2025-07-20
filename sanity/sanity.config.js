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
  plugins: [
    structureTool({
      document: {
        actions: (prev, context) => {
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