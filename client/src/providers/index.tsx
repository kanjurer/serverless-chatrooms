'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SocketProvider } from './socket';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SocketProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </SocketProvider>
    </SessionProvider>
  );
}
