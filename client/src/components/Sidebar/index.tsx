'use client';

import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton, fadeConfig } from '@chakra-ui/react';
import { Flex, Text, Heading } from '@chakra-ui/layout';
import { ArrowLeftIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import useChats from '@/hooks/useChats';

interface SidebarProps {
  user: any;
  signOut: any;
}

export default function Sidebar({ user, signOut }: SidebarProps) {
  const router = useRouter();
  const { chats, addChat, removeChat } = useChats();

  const redirect = (id: string) => {
    router.push(`/chat?id=${id}`);
  };

  const newChat = async () => {
    const input = prompt('Enter name of a chat room');
    if (!input) return;
    const chatId = await addChat({
      id: 'test',
      name: input,
      createdBy: user.email,
      messages: [],
      createdAt: Date.now(),
    });
    redirect(chatId);
  };

  const deleteChat = async (chatId: string) => {
    await removeChat(chatId);
    router.push('/');
  };

  return (
    <Flex
      // bg="blue.100"
      h="100%"
      w="300px"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        // bg="red.100"
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Flex align="center">
          <Text>{user.email}</Text>
        </Flex>

        <IconButton
          size="sm"
          isRound
          icon={<ArrowLeftIcon />}
          aria-label="Sign Out"
          onClick={() => {
            router.push('/login');
            setTimeout(signOut, 1000);
          }}
        />
      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>
        New Chat Room
      </Button>

      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: 'none' }}
        flex={1}
      >
        {chats
          .filter((chat) => chat.createdBy === user.email)
          .sort((a, b) => b.createdAt - a.createdAt).length != 0 && (
          <Heading size="sm"> My chats</Heading>
        )}
        {chats
          .filter((chat) => chat.createdBy === user.email)
          .map((chat) => (
            <Flex
              key={Math.random()}
              p={3}
              align="center"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={() => redirect(chat.id)}
            >
              <Text>{chat.name}</Text>
              <IconButton
                isRound={true}
                variant="outline"
                boxSize={0}
                icon={<DeleteIcon />}
                aria-label="delete"
                onClick={(e) => {
                  deleteChat(chat.id);
                  e.stopPropagation();
                }}
              />
            </Flex>
          ))}
        {chats
          .filter((chat) => chat.createdBy !== user.email)
          .sort((a, b) => b.createdAt - a.createdAt).length != 0 && (
          <Heading size="sm">Public Chats</Heading>
        )}

        {chats
          .filter((chat) => chat.createdBy !== user.email)
          .map((chat) => (
            <Flex
              key={Math.random()}
              p={3}
              align="center"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={() => redirect(chat.id)}
            >
              <Text>{chat.name}</Text>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
}
