import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [char, setChar] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => setChar(res.data))
      .catch(() => {});
  }, [id]);

  if (!char) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Button onClick={() => router.back()}>Back</Button>
      <Typography variant="h3" gutterBottom>{char.name}</Typography>
      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <Box component="img" src={char.image} alt={char.name} sx={{ width: 200, borderRadius: 2 }} />
        <Box>
          <Typography><strong>Species:</strong> {char.species}</Typography>
          <Typography><strong>Status:</strong> {char.status}</Typography>
          <Typography><strong>Origin:</strong> {char.origin.name}</Typography>
          <Typography><strong>Location:</strong> {char.location.name}</Typography>
          <Typography><strong>Episodes:</strong> {char.episode.length}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
