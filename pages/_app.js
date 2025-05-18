import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '../store/auth';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

/**
 * Tema personalizado para Material-UI con modo oscuro
 */
const theme = createTheme({
  palette: { mode: 'dark', primary: { main: '#4caf50' } },
});

/**
 * Componente principal de la aplicación (_app.js)
 * 
 * Este componente demuestra:
 * - Configuración global de la aplicación
 * - Layout compartido entre páginas
 * - Uso de componentes condicionales (NavBar)
 * - Integración de Material-UI con Next.js
 * - Configuración de metadatos globales (Head)
 * 
 * @param {Object} props - Props del componente
 * @param {React.Component} props.Component - Componente de página a renderizar
 * @param {Object} props.pageProps - Props para el componente de página
 */
export default function MyApp({ Component, pageProps }) {
  const { user } = useAuth();
  const router = useRouter();

  // Mostrar NavBar solo si estamos logueados y no en /login
  const showNav = user && router.pathname !== '/login';

  return (
    <>
      {/* Configuración de metadatos globales */}
      <Head>
        <title>Hiram Tech Test</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Proveedor de tema de Material-UI */}
      <ThemeProvider theme={theme}>
        {/* Reset de estilos CSS globales */}
        <CssBaseline />
        
        {/* Renderizado condicional de la barra de navegación */}
        {showNav && <NavBar />}
        
        {/* Renderizado del componente de página actual */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
