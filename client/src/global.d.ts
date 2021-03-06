interface msg {
  content: string;
  from: user;
  to: string;
  timeStamp: string;
  type: "self" | "bot" | "peer";
}
interface room {
  name: string;
  id: string;
  messages: msg[];
  users?: [];
  symmetricKey: CryptoKey | string;
}

interface user {
  name: string;
  id?: string;
  publicKey?: string;
  privateKey?: string;
  keypair?: CryptoKeyPair;
  symmetricKey?: CryptoKey;
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
