interface msg {
  content: string;
  from: string;
  to: string;
  timeStamp: string;
}
interface room {
  name: string;
  id: string;
  messages: msg[];
  users?: [];
  publicKey?: string;
  privateKey?: string;
}

interface user {
  name: string;
  id?: string;
  publicKey?: string;
  privateKey?: string;
}

interface state {
  currentRoom: string;
  rooms: room[];
  socket?: any;
}

interface action {
  type: string;
  payload: any;
}
