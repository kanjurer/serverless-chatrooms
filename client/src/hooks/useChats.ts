import { createChat, getChats, deleteChat } from '@/handler';
import { IChat, IMessage } from '@/types';
import { useContext, useState, useEffect } from 'react';

export default function useChats() {
  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    getChats().then((res: any) => {
      // TODO
      setChats(res.data.chats);
    });
  }, []);

  const addChat = async (chat: IChat): Promise<string> => {
    const data: any = await createChat(chat);
    const c = JSON.parse(data.data.body);

    setChats((prev) => [c, ...prev]);

    return c.id;
  };

  const removeChat = async (chatId: string) => {
    await deleteChat(chatId);
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  return { chats, addChat, removeChat };
}
