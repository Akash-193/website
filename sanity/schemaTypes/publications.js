export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    // ... your 'doi' field ...
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
    // Add the two new fields below
    {
      name: 'highlightImage',
      title: 'Highlight Image',
      type: 'image',
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'A short, one or two-sentence summary for the highlight card.',
      type: 'text',
    },
    // ... all your other fields (authors, year, etc.) remain the same ...
    {
      name: 'authors',
      title: 'Authors',
      type: 'string',
      readOnly: true,
    },
    // ... etc.
  ],
  // ... your orderings array ...
};