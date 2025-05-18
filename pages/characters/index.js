// pages/characters/index.js
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Typography
} from '@mui/material';
import { useAuth } from '../../store/auth';
import CharacterCard from '../../components/CharacterCard';

/**
 * Página de listado de personajes
 * 
 * Implementa:
 * - Diseño con Grid para listas
 * - Scroll infinito para cargar más datos
 * - Navegación a páginas de detalle
 * - Paso de datos a componentes hijos (CharacterCard)
 * - Protección de ruta mediante autenticación
 */
export default function Characters() {
  const { user, _hydrated } = useAuth();
  const router = useRouter();

  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  // Redirección si no hay sesión (después de hidratación de Zustand)
  useEffect(() => {
    if (_hydrated && !user) {
      router.replace('/login');
    }
  }, [_hydrated, user, router]);

  // Fetch de personajes con paginación
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

  // Implementación de scroll infinito con Intersection Observer
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

  // Navegación a la página de detalle
  const openDetail = id => router.push(`/characters/${id}`);

  return (
    <Container sx={{ py: 4 }}>
      {/* Grid para mostrar lista de personajes */}
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {chars.map(character => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            {/* 
              Paso de datos al componente hijo:
              - character: datos completos del personaje
              - onClick: función para navegar al detalle
            */}
            <CharacterCard 
              character={character} 
              onClick={() => openDetail(character.id)} 
            />
          </Grid>
        ))}
      </Grid>

      {/* Elemento centinela para infinite scroll */}
      <div ref={loader} style={{ height: 1 }} />

      {!hasMore && (
        <Typography align="center" sx={{ mt: 2 }}>
          No more characters.
        </Typography>
      )}
    </Container>
  );
}
