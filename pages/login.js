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

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [characters, setCharacters] = useState([]);
  const [favorite, setFavorite] = useState(null);
  const [error, setError] = useState('');

  // cargar lista de personajes
  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character?page=1')
      .then((res) => setCharacters(res.data.results))
      .catch(() => {});
  }, []);

  const handleSubmit = () => {
    if (!favorite) {
      setError('Selecciona un personaje favorito');
      return;
    }
    const ok = login({ username, password, favorite });
    if (ok) {
      router.push('/characters');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      {/* Avatar grande arriba */}
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

        {error && <Typography color="error">{error}</Typography>}

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
