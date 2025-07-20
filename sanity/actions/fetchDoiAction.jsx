import React, { useState } from 'react';
import { useDocumentOperation } from 'sanity';
import { Spinner } from '@sanity/ui';

// Helper function to find a DOI in a string
function extractDoi(str) {
  if (!str) return null;
  const doiRegex = /(10.\d{4,9}\/[-._;()/:A-Z0-9]+)/i;
  const match = str.match(doiRegex);
  return match ? match[0] : null;
}

export function FetchDoiAction(props) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [isFetching, setIsFetching] = useState(false);

  return {
    label: isFetching ? 'Fetching...' : 'Fetch from DOI',
    disabled: isFetching,
    icon: isFetching ? Spinner : undefined,
    onHandle: async () => {
      setIsFetching(true);
      const doiValue = props.draft ? props.draft.doi : props.published.doi;
      const extractedDoi = extractDoi(doiValue);

      if (!extractedDoi) {
        alert('Could not find a valid DOI in the input.');
        setIsFetching(false);
        return;
      }

      try {
        const response = await fetch(`https://api.crossref.org/works/${extractedDoi}`);
        if (!response.ok) throw new Error('Failed to fetch from CrossRef. Check the DOI.');

        const data = await response.json();
        const pub = data.message;
        const authors = pub.author.map(a => `${a.family}, ${a.given[0]}.`).join(', ');

        patch.execute([
          { set: { title: pub.title[0] } },
          { set: { authors: authors } },
          { set: { journal: pub['container-title'] ? pub['container-title'][0] : 'Preprint' } },
          { set: { year: pub.created['date-parts'][0][0] } },
          { set: { link: pub.URL } },
          { set: { doi: extractedDoi } },
        ]);
        
      } catch (error) {
        alert(error.message);
      } finally {
        setIsFetching(false);
      }
    },
  };
}