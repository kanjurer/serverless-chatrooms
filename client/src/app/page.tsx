'use client';

import { Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  console.log('adad', data);

  if (status == 'unauthenticated') {
    router.push('/login');
    return <div>Redirecting...</div>;
  } else if (status == 'loading') {
    return <div>Loading...</div>;
  } else if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box h="100vh">
        <Sidebar user={data?.user} signOut={signOut} />
      </Box>
    </>
  );
}
