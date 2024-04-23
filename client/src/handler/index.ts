import { IChat } from '@/types';
import axios, { AxiosResponse } from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.withCredentials = true;

export async function getChats(): Promise<AxiosResponse<IChat[]>> {
  return await axios({
    url: `https://kwgmdwinkj.execute-api.us-east-1.amazonaws.com/test/new-chat`,
    method: 'GET',
  });
}

export async function getChat(chatId: string): Promise<AxiosResponse<IChat>> {
  return await axios({
    url: `https://kwgmdwinkj.execute-api.us-east-1.amazonaws.com/test/new-chat/${chatId}`,
    method: 'GET',
  });
}

export async function createChat(chat: IChat): Promise<AxiosResponse<IChat>> {
  return await axios({
    url: 'https://kwgmdwinkj.execute-api.us-east-1.amazonaws.com/test/new-chat',
    method: 'POST',
    data: {
      name: chat.name,
      createdBy: chat.createdBy,
      users: [],
      messages: [],
      createdAt: Date.now(),
    },
  });
}

export async function deleteChat(
  chatId: string
): Promise<AxiosResponse<IChat>> {
  return await axios({
    url: `https://kwgmdwinkj.execute-api.us-east-1.amazonaws.com/test/new-chat/${chatId}`,
    method: 'DELETE',
  });
}
