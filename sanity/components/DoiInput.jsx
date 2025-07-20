import React, { useState, useCallback } from 'react';
import { set, unset } from 'sanity';
import { Box, Card, Flex, Stack, TextInput, Button, Text, Spinner } from '@sanity/ui';

const DoiInput = (props) => {
  const { elementProps, onChange, value = '' } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.crossref.org/works/${value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch from CrossRef. Check the DOI.');
      }
      const data = await response.json();
      const pub = data.message;

      // Format authors: "LastName, F., OtherLastName, F."
      const authors = pub.author.map(a => `${a.family}, ${a.given[0]}.`).join(', ');
      const title = pub.title[0];
      const journal = pub['container-title'] ? pub['container-title'][0] : 'Preprint';
      const year = pub.created['date-parts'][0][0];
      const link = pub.URL;

      // Create a patch to update the document fields
      const patch = [
        set(title, ['title']),
        set(authors, ['authors']),
        set(String(journal), ['journal']),
        set(year, ['year']),
        set(link, ['link']),
      ];

      // Apply the patch via the onChange handler
      onChange(patch);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [value, onChange]);

  return (
    <Card>
      <Stack space={3}>
        <Text size={1} weight="semibold">DOI Input</Text>
        <Flex gap={3}>
          <Box flex={1}>
            <TextInput
              {...elementProps}
              onChange={event => onChange(set(event.currentTarget.value))}
              value={value}
              placeholder="e.g., 10.1021/acs.chemrev.5b00392"
            />
          </Box>
          <Button
            onClick={handleFetch}
            text={loading ? '' : 'Fetch'}
            icon={loading ? Spinner : null}
            disabled={loading || !value}
            mode="ghost"
          />
        </Flex>
        {error && <Card tone="critical" padding={3}><Text>{error}</Text></Card>}
      </Stack>
    </Card>
  );
};

export default DoiInput;