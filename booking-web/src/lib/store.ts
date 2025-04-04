import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import serviceReducer from '@/features/services/serviceSlice';
import bookingReducer from '@/features/booking/bookingSlice';
import chatReducer from '@/features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    bookings: bookingReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;