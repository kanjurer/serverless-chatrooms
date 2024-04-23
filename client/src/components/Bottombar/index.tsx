import { useState } from 'react';
import { FormControl, Input, Button } from '@chakra-ui/react';
import { IMessage } from '@/types';

interface BottombarProps {
  chatId: string;
  username: string;
  sendMessage: (m: IMessage) => void;
}

export default function Bottombar({
  chatId,
  username,
  sendMessage,
}: BottombarProps) {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input) return;
    const msg: IMessage = {
      chatId,
      sender: username,
      text: input,
      timestamp: Date.now(),
    };
    sendMessage(msg);
    setInput('');
  };

  return (
    <FormControl p={3} onSubmit={handleSubmit} as="form">
      <Input
        placeholder="Type a message..."
        autoComplete="off"
        onChange={handleChange}
        value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
}
