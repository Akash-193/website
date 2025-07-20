import DoiInput from '../components/DoiInput';

export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'doi',
      title: 'DOI',
      description: 'Paste the DOI here and click "Fetch" to populate fields automatically.',
      type: 'string',
      component: DoiInput // <-- This line has been corrected
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