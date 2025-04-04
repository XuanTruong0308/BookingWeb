import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  activeChat: string | null;
  onlineUsers: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  activeChat: null,
  onlineUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setActiveChat,
  setOnlineUsers,
  setLoading,
  setError,
} = chatSlice.actions;
export default chatSlice.reducer;