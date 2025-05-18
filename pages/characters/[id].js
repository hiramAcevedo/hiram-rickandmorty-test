// pages/characters/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

/**
 * Página de detalle de personaje
 * 
 * Esta página demuestra:
 * - Uso de rutas dinámicas con [id] en Next.js
 * - Obtención de parámetros de ruta con useRouter
 * - Peticiones a API externa con axios
 * - Navegación programática entre páginas
 * - Estilos y layout con Material-UI
 */
export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [char, setChar] = useState(null);

  // Carga de datos cuando cambia el parámetro de ruta
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => setChar(res.data))
      .catch(() => {});
  }, [id]);

  if (!char) return null;

  // Navegación entre personajes adyacentes
  const currentId = parseInt(id, 10);
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1; // asume que existe; la API llega hasta 826

  return (
    <Container sx={{ py: 4 }}>
      {/* Botones de navegación */}
      <Stack direction="row" spacing={1} mb={2}>
        <Button variant="outlined" onClick={() => router.push('/characters')}>
          Volver
        </Button>

        {/* Navegación condicional al personaje anterior */}
        {prevId && (
          <Button
            variant="contained"
            onClick={() => router.push(`/characters/${prevId}`)}
          >
            Anterior
          </Button>
        )}

        {/* Navegación al personaje siguiente */}
        <Button
          variant="contained"
          onClick={() => router.push(`/characters/${nextId}`)}
        >
          Siguiente
        </Button>
      </Stack>

      <Typography variant="h3" gutterBottom>
        {char.name}
      </Typography>

      {/* Diseño flexible con flex layout */}
      <Box sx={{ display: 'flex', gap: 4, mt: 2, flexWrap: 'wrap' }}>
        <Box
          component="img"
          src={char.image}
          alt={char.name}
          sx={{ width: 200, borderRadius: 2 }}
        />
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
