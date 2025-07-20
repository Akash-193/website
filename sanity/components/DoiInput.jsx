import React, { useState, useCallback } from 'react';
import { set } from 'sanity';
import { Box, Flex, Button, Text, Spinner, Card, Stack } from '@sanity/ui';

// New helper function to find a DOI in a string
function extractDoi(str) {
  if (!str) return null;
  // Regex to find a DOI string (e.g., 10.xxxx/...)
  const doiRegex = /(10.\d{4,9}\/[-._;()/:A-Z0-9]+)/i;
  const match = str.match(doiRegex);
  return match ? match[0] : null;
}

const DoiInput = (props) => {
  const { onChange, value = '' } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = useCallback(async () => {
    // First, try to extract the DOI from the input value
    const extractedDoi = extractDoi(value);

    if (!extractedDoi) {
      setError('Could not find a valid DOI in the input.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.crossref.org/works/${extractedDoi}`);
      if (!response.ok) {
        throw new Error('Failed to fetch from CrossRef. Check the DOI.');
      }
      const data = await response.json();
      const pub = data.message;

      const authors = pub.author.map(a => `${a.family}, ${a.given[0]}.`).join(', ');
      const title = pub.title[0];
      const journal = pub['container-title'] ? pub['container-title'][0] : 'Preprint';
      const year = pub.created['date-parts'][0][0];
      const link = pub.URL;

      const patch = [
        set(title, ['title']),
        set(authors, ['authors']),
        set(String(journal), ['journal']),
        set(year, ['year']),
        set(link, ['link']),
        // Also update the DOI field to the clean, extracted one
        set(extractedDoi, ['doi'])
      ];
      onChange(patch);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [value, onChange]);

  return (
    <Stack space={3}>
      {/* This renders the default Sanity input field */}
      {props.renderDefault(props)}

      <Flex gap={3} align="center">
        <Button
          onClick={handleFetch}
          text="Fetch Publication Data"
          icon={loading ? Spinner : null}
          disabled={loading || !value}
          tone="primary"
          style={{ width: '100%' }}
        />
      </Flex>
      {error && <Card tone="critical" padding={3}><Text size={1}>{error}</Text></Card>}
    </Stack>
  );
};

export default DoiInput;