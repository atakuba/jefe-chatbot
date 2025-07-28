// interfaces/IMessage.ts
export interface IMessage {
  message: string;
  timestamp: string;
  isAta: boolean; // true = support agent, false = user
}
