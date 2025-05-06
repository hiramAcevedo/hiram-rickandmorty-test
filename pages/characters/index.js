// pages/characters/index.js
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material';
import { useAuth } from '../../store/auth';

export default function Characters() {
  const { user, _hydrated } = useAuth();
  const router = useRouter();

  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  // 1) Redirect SOLO después de que Zustand se hidrate
  useEffect(() => {
    if (_hydrated && !user) {
      router.replace('/login');
    }
  }, [_hydrated, user, router]);

  // 2) Fetch de páginas cuando haya sesión y tras hidratación
  const fetchCharacters = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://rickandmortyapi.com/api/character',
        { params: { page } }
      );
      setChars(prev => [...prev, ...res.data.results]);
      setHasMore(!!res.data.info.next);
    } catch {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    if (_hydrated && user) {
      fetchCharacters();
    }
  }, [_hydrated, user, fetchCharacters]);

  // 3) Infinite scroll observer permanece siempre en el DOM
  useEffect(() => {
    if (!loader.current || !hasMore) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(p => p + 1);
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(loader.current);
    return () => obs.disconnect();
  }, [hasMore]);

  const openDetail = id => router.push(`/characters/${id}`);

  return (
    <Container sx={{ py: 4 }}>

      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {chars.map(ch => (
          <Grid item key={ch.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => openDetail(ch.id)}
              sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: theme => theme.shadows[6]
                }
              }}
            >
              <CardMedia
                component="img"
                image={ch.image}
                alt={ch.name}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{ch.name}</Typography>
                <Typography variant="body2">
                  {ch.species} – {ch.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sentinel para infinite scroll, siempre presente */}
      <div ref={loader} style={{ height: 1 }} />

      {!hasMore && (
        <Typography align="center" sx={{ mt: 2 }}>
          No more characters.
        </Typography>
      )}
    </Container>
  );
}
