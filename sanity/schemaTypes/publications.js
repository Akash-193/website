import DoiInput from '../components/DoiInput'; // We will create this component

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
      components: {
        input: DoiInput // Assigning our custom component
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true, // Will be filled automatically
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'string',
      readOnly: true, // Will be filled automatically
    },
    {
        name: 'year',
        title: 'Year',
        type: 'number',
        readOnly: true, // Will be filled automatically
    },
    {
      name: 'journal',
      title: 'Journal or Preprint Info',
      type: 'string',
      readOnly: true, // Will be filled automatically
    },
    {
      name: 'link',
      title: 'Link (DOI URL)',
      type: 'url',
      readOnly: true, // Will be filled automatically
    },
    // ... Keep your status and tags fields as they are ...
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
  // ... keep your orderings array ...
};