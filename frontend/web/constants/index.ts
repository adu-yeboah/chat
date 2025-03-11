import { Message, User } from "@/types/chat";

export const currentUser: User = { id: '1', name: 'Shikha Gupta', avatar: '/avatar1.png', status: 'active' };
export const otherUser: User = { id: '2', name: 'John Doe', avatar: '/avatar2.png', status: 'active' };

export const messages: Message[] = [
  { id: '1', sender: otherUser, content: 'Hi', timestamp: '11:12 pm' },
  { id: '2', sender: otherUser, content: 'Hey! How are you doing? I was wondering if I can share the documents with me by today itself...', timestamp: '11:13 pm' },
  { id: '3', sender: currentUser, content: 'I am doing great. How are you doing?', timestamp: '11:14 pm' },
  { id: '4', sender: currentUser, content: 'Please give me some time.', timestamp: '11:14 pm' },
  { id: '5', sender: otherUser, content: 'As I am already working on that document.', timestamp: '11:15 pm' },
];
