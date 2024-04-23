import { getChat } from '@/handler';
import { SocketContext } from '@/providers/socket';
import { IChat, IMessage } from '@/types';
import { useContext, useState, useEffect } from 'react';

export default function useChat(chatId: string | null) {
  const [chat, setChat] = useState<IChat>({
    id: '',
    name: '',
    messages: [],
    createdBy: '',
    createdAt: Date.now(),
  });
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log('adadsasdabhjadshkabjkdsbj');
    if (!chatId) return;
    getChat(chatId).then((res) => {
      setChat(res.data);
      console.log(res.data);
    });
  }, [chatId]);

  useEffect(() => {
    if (!socket) {
      console.log('socket notq connected');
      return;
    }

    const func = function (event: any) {
      const data = JSON.parse(event.data);
      if (chatId == null || chatId !== data.id) {
        console.log(chatId);
        console.log('Asdasdsa', data);
        return;
      }
      setChat((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender: data.sender,
            text: data.text,
            timestamp: data.timestamp,
            chatId: chatId,
          },
        ],
      }));
      console.log('Message from server ', data);
    };

    // message received
    socket.addEventListener('message', func);

    return () => {
      socket.removeEventListener('message', func);
    };
  }, [socket, chatId]);

  const sendMessage = (message: IMessage) => {
    if (!socket) {
      console.log('socket not connected');
      return;
    }
    setChat((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    socket.send(
      JSON.stringify({
        action: 'sendmessage',
        message: {
          id: chatId,
          sender: message.sender,
          text: message.text,
          timestamp: message.timestamp,
        },
      })
    );
  };

  return { chat, sendMessage };
}
