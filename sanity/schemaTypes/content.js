export default {
  name: 'content',
  title: 'Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'displayTitle',
      title: 'Display Title',
      type: 'string',
      description: 'Optional: This title will appear on the page header. If left blank, the main title above will be used.'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
};