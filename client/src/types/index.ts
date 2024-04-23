export interface IUser {
  username: string;
}

export interface IChat {
  id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  messages: IMessage[];
}

export interface IMessage {
  chatId: string;
  sender: string;
  text: string;
  timestamp: number;
}
