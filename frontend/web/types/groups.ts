import { User } from "./chat";
import { Message } from "./message";

export interface Group {
  id: number | string;
  name: string;
  creator_id: number;
  messages?: Message[]; 
  members?: GroupMember[]; 
}

//GroupMember type
export interface GroupMember {
  id: number;
  user_id: number;
  group_id: number;
  user?: User; 
}

