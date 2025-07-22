export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'highlightImage',
      title: 'Highlight Image',
      type: 'image',
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'A short, one or two-sentence summary for the highlight card.',
      type: 'array',
      of: [
        { 
          type: 'block',
          // This 'marks' section enables extra formatting options
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Subscript', value: 'sub'},
              {title: 'Superscript', value: 'sup'}
            ]
          }
        }
      ]
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'string',
    },
    {
      name: 'journal',
      title: 'Journal or Preprint Info',
      type: 'string',
    },
    {
        name: 'year',
        title: 'Year',
        type: 'number',
    },
    {
      name: 'link',
      title: 'Link (DOI or Preprint URL)',
      type: 'url',
    },
    {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
            list: ['Preprint', 'Published'],
            layout: 'radio'
        }
    },
    {
      name: 'tags',
      title: 'Tags / Research Themes',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
  ],
  orderings: [
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'}
      ]
    }
  ]
};