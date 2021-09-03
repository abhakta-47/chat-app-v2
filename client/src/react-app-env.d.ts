/// <reference types="react-scripts" />

declare global {
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
  }

  interface user {
    name: string;
    id?: string;
    pubkey?: string;
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
}
