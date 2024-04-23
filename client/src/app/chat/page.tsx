'use client';

import { Flex, Text } from '@chakra-ui/layout';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import Topbar from '../../components/Topbar';
import Bottombar from '../../components/Bottombar';
import { useRef, useEffect, Suspense } from 'react';
import useChat from '@/hooks/useChat';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Chat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');
  const { data, status } = useSession();
  const bottomOfChat = useRef<HTMLInputElement>(null);

  const { chat, sendMessage } = useChat(chatId);

  useEffect(() => {
    setTimeout(() => {
      const el: any = bottomOfChat?.current;
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }, [chat.messages]);

  if (status == 'unauthenticated') {
    router.push('/login');
    return <div>Redirecting...</div>;
  } else if (status == 'loading') {
    return <div>Loading...</div>;
  } else if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>

      <Sidebar user={data?.user} signOut={signOut} />

      <Flex flex={1} direction="column">
        <Topbar chat={chat} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: 'none' }}
        >
          {chat.messages.map((msg) => {
            const sender = msg.sender !== data?.user?.email;
            return (
              <Flex
                key={Math.random()}
                alignSelf={sender ? 'flex-start' : 'flex-end'}
                bg={sender ? 'blue.100' : 'green.100'}
                w="fit-content"
                minWidth="100px"
                borderRadius="lg"
                p={3}
                m={1}
              >
                <Text>
                  <Text
                    fontSize="sm" // Adjust font size to make the sender's email smaller
                    color="gray.500" // Adjust color for better readability
                    mb={1} // Add margin-bottom to create space between sender email and message
                  >
                    {msg.sender}
                  </Text>
                  {msg.text}
                  <Text
                    fontSize="sm" // Adjust font size to make the timestamp smaller
                    mt={1} // Add margin-top to separate timestamp from message
                    color="gray.500" // Adjust color for better readability
                  >
                    &nbsp;
                    {new Date(msg.timestamp).toLocaleDateString('en-US') !=
                      new Date().toLocaleDateString('en-US') &&
                      new Date(msg.timestamp).toLocaleString('en-US', {
                        weekday: 'long',
                      })}{' '}
                    {new Date(msg.timestamp).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Text>
                </Text>
              </Flex>
            );
          })}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar
          chatId={chatId || 'test'}
          username={data?.user?.email || 'a'}
          sendMessage={sendMessage}
        />
      </Flex>
    </Flex>
  );
}

export default function ChatDefault() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Chat />
    </Suspense>
  );
}
