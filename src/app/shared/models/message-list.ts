import {Message} from "./message";

export class MessageList {
  current_page: number;
  data: Message[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
