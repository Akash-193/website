import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {FetchDoiAction} from './actions/fetchDoiAction' // <-- This is correct

export default defineConfig({
  name: 'default',
  title: 'Research Website',

  projectId: '3w49e1s5',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,

    // The 'templates' line has been removed.
    // The 'document' section is correct and remains.
    document: {
      actions: (prev, context) => {
        // Add our custom action to the 'publication' document type
        return context.schemaType === 'publication'
          ? [...prev, FetchDoiAction]
          : prev;
      },
    },
  },
})