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
      name: 'authors',
      title: 'Authors',
      type: 'string',
      description: 'Enter author names, separated by commas.',
    },
    {
      name: 'journal',
      title: 'Journal or Preprint Info',
      type: 'string',
      description: 'e.g., J. Chem. Inf. Model. or ChemRxiv (2025) preprint',
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