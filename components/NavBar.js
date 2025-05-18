// components/NavBar.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAuth } from '../store/auth';
import { useRouter } from 'next/router';

/**
 * Componente de barra de navegación
 * 
 * Este componente demuestra:
 * - Uso de estilos con Material-UI (sx prop)
 * - Acceso al estado global de la aplicación (Zustand)
 * - Eventos de usuario (onClick para logout)
 * - Navegación programática (useRouter)
 * - Renderizado condicional basado en el estado del usuario
 */
export default function NavBar() {
  const { user, favorite, logout } = useAuth();
  const router = useRouter();

  // Evento de logout con navegación programática
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  // Renderizado condicional - No mostrar si no hay usuario
  if (!user) return null;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h3" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Personajes
        </Typography>

        {/* Renderizado condicional del avatar del personaje favorito */}
        {favorite && (
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Avatar
              src={favorite.image}
              alt={favorite.name}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
          </Box>
        )}
        <Typography sx={{ mr: 2 }}>{user}</Typography>

        {/* Botón con evento para cerrar sesión */}
        <Button variant="contained" color="success" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
