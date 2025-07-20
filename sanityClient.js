import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3w49e1s5',     // ✅ Your actual Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01'
});

export default client;
