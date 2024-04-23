import { createContext, useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const SocketContext = createContext<WebSocket | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket>();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      return;
    } else if (status === 'loading') {
      return;
    } else {
      const socket = new WebSocket(
        `${'wss://ip36v9dwrb.execute-api.us-east-1.amazonaws.com'}/production/`
      );
      setSocket(socket);

      socket.addEventListener('open', function (event) {
        console.log('socket open');
      });

      socket.addEventListener('error', function (event) {
        console.log(event);
      });

      socket.addEventListener('close', function (event) {
        console.log('socket close');
      });
    }

    return () => {
      socket?.close();
    };
  }, [status]); // TODO

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
