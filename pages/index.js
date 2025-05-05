// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si hay usuario, ir a /characters; si no, a /login
    if (user) {
      router.replace('/characters');
    } else {
      router.replace('/login');
    }
  }, [user, router]);

  return null;
}

