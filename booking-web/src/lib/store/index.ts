import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import bookingReducer from '@/features/booking/bookingSlice';
import chatReducer from '@/features/chat/chatSlice';
import servicesReducer from '@/features/services/serviceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    chat: chatReducer,
    services: servicesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;