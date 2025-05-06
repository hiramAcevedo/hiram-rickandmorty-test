import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '../store/auth';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const theme = createTheme({
  palette: { mode: 'dark', primary: { main: '#4caf50' } },
});

export default function MyApp({ Component, pageProps }) {
  const { user } = useAuth();
  const router = useRouter();

  // Mostrar NavBar solo si estamos logueados y no en /login
  const showNav = user && router.pathname !== '/login';

  return (
    <>
      <Head>
        <title>Hiram Tech Test</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showNav && <NavBar />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
