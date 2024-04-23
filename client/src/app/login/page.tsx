'use client';

import LoginScreen from '@/components/Login';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status == 'authenticated') {
    router.push('/');
    return <div>Redirecting...</div>;
  } else if (status == 'loading') {
    return <div>Loading...</div>;
  }

  return <LoginScreen signIn={signIn} />;
}
