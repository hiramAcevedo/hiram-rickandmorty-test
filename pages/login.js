// pages/login.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Avatar,
} from '@mui/material';
import { useAuth } from '../store/auth';

/**
 * Página de login
 * 
 * Esta página demuestra:
 * - Formularios y manejo de estados con React hooks
 * - Peticiones a API externa (Rick & Morty)
 * - Navegación programática con useRouter
 * - Componentes interactivos (Autocomplete)
 * - Eventos de usuario (onChange, onClick)
 * - Validación de formularios
 * 
 * CREDENCIALES DE ACCESO:
 * Usuario: Test123
 * Contraseña: password@2
 */
export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  // Estados locales para el formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [characters, setCharacters] = useState([]);
  const [favorite, setFavorite] = useState(null);
  const [error, setError] = useState('');

  // Efecto para cargar los personajes desde la API
  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character?page=1')
      .then((res) => setCharacters(res.data.results))
      .catch(() => {});
  }, []);

  // Manejo del envío del formulario con validación
  const handleSubmit = () => {
    if (!favorite) {
      setError('Selecciona un personaje favorito');
      return;
    }
    // Llamada a la función de login del store (Zustand)
    const ok = login({ username, password, favorite });
    if (ok) {
      // Navegación programática tras login exitoso
      router.push('/characters');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      {/* Renderizado condicional del avatar del personaje favorito */}
      {favorite && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={favorite.image}
            alt={favorite.name}
            sx={{ width: 160, height: 160 }}
          />
        </Box>
      )}

      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {/* Recuadro con credenciales de acceso */}
      <Box 
        sx={{ 
          p: 2, 
          mb: 3, 
          bgcolor: 'rgba(76, 175, 80, 0.1)', 
          borderRadius: 2,
          border: '1px solid #4caf50'
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Credenciales de acceso:
        </Typography>
        <Typography variant="body2">
          <strong>Usuario:</strong> Test123
        </Typography>
        <Typography variant="body2">
          <strong>Contraseña:</strong> password@2
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          También debes seleccionar un personaje favorito.
        </Typography>
      </Box>

      {/* Formulario de login con captura de eventos */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Componente Autocomplete para selección de personaje */}
        <Autocomplete
          options={characters}
          getOptionLabel={(opt) => opt.name}
          onChange={(e, opt) => {
            setFavorite(opt);
            setError('');
          }}
          renderOption={(props, opt) => (
            <Box
              component="li"
              {...props}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar
                src={opt.image}
                alt={opt.name}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              {opt.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Favorite Character" />
          )}
        />

        {/* Mensaje de error condicional */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Botón de envío con estado deshabilitado condicional */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!favorite}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
