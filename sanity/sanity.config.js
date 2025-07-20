import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {FetchDoiAction} from './actions/fetchDoiAction' // <-- 1. IMPORT the new action

export default defineConfig({
  name: 'default',
  title: 'Research Website',

  projectId: '3w49e1s5',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,

    // vvv 2. ADD THIS ENTIRE 'templates' AND 'document' SECTION vvv
    templates: (prev) => prev.filter((template) => template.id !== 'publication'),
    document: {
      actions: (prev, context) => {
        // Add our custom action to the 'publication' document type
        return context.schemaType === 'publication'
          ? [...prev, FetchDoiAction]
          : prev;
      },
    },
    // ^^^ 2. ADD THIS ENTIRE 'templates' AND 'document' SECTION ^^^
  },
})