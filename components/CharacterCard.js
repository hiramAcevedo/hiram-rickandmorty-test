import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material';

/**
 * Componente de tarjeta de personaje
 * 
 * Este componente muestra la información básica de un personaje en forma de tarjeta
 * y demuestra:
 * - Paso de datos mediante props (character, onClick)
 * - Estilos y clases con Material-UI (sx prop)
 * - Manejo de eventos (onClick)
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.character - Datos del personaje a mostrar
 * @param {Function} props.onClick - Función a ejecutar al hacer clic en la tarjeta
 * @returns {JSX.Element} - Componente de tarjeta
 */
export default function CharacterCard({ character, onClick }) {
  return (
    <Card
      onClick={onClick}
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
        image={character.image}
        alt={character.name}
        sx={{ height: 200, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{character.name}</Typography>
        <Typography variant="body2">
          {character.species} – {character.status}
        </Typography>
      </CardContent>
    </Card>
  );
} 