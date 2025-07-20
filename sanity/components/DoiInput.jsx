import React, { useState, useCallback } from 'react';
import { set } from 'sanity';
import { Box, Flex, Button, Text, Spinner, Card, Stack, TextInput } from '@sanity/ui';

// Helper function to find a DOI in a string
function extractDoi(str) {
  if (!str) return null;
  const doiRegex = /(10.\d{4,9}\/[-._;()/:A-Z0-9]+)/i;
  const match = str.match(doiRegex);
  return match ? match[0] : null;
}

const DoiInput = (props) => {
  const { onChange, value = '' } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = useCallback(async () => {
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
        set(extractedDoi, ['doi']),
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
      <Text on="input" size={1} weight="semibold">DOI</Text>
      <Flex gap={2}>
        <Box flex={1}>
          <TextInput
            fontSize={2}
            onChange={event => onChange(set(event.currentTarget.value))}
            value={value}
            placeholder="Paste URL or DOI here"
          />
        </Box>
        <Button
          onClick={handleFetch}
          text="Fetch"
          tone="primary"
          icon={loading ? Spinner : null}
          disabled={loading || !value}
        />
      </Flex>
      {error && <Card padding={3} tone="critical"><Text size={1}>{error}</Text></Card>}
    </Stack>
  );
};

export default DoiInput;