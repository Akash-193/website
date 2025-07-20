export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'doi',
      title: 'DOI',
      description: 'Paste a URL or DOI here, then use the "Fetch from DOI" action below.',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'journal',
      title: 'Journal or Preprint Info',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'link',
      title: 'Link (DOI URL)',
      type: 'url',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Preprint', 'Published'], layout: 'radio' }
    },
    {
      name: 'tags',
      title: 'Tags / Research Themes',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' }
    },
  ],
};