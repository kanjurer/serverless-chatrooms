import { IChat } from '@/types';
import { Flex, Heading, Avatar } from '@chakra-ui/react';

interface TopbarProps {
  chat: IChat;
}

export default function Topbar({ chat }: TopbarProps) {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Heading size="lg">{chat.name}</Heading>
    </Flex>
  );
}
