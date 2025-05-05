// components/NavBar.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAuth } from '../store/auth';
import { useRouter } from 'next/router';

export default function NavBar() {
  const { user, favorite, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

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

        {/* Avatar y nombre de usuario */}
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

        <Button variant="contained" color="success" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
