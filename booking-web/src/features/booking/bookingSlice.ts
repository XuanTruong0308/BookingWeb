import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  selectedServices: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  selectedStaff: string | null;
}

const initialState: BookingState = {
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  selectedStaff: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectService: (state, action: PayloadAction<string>) => {
      state.selectedServices.push(action.payload);
    },
    unselectService: (state, action: PayloadAction<string>) => {
      state.selectedServices = state.selectedServices.filter(id => id !== action.payload);
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setStaff: (state, action: PayloadAction<string>) => {
      state.selectedStaff = action.payload;
    },
    clearBooking: (state) => {
      state.selectedServices = [];
      state.selectedDate = null;
      state.selectedTime = null;
      state.selectedStaff = null;
    },
  },
});

export const { selectService, unselectService, setDate, setTime, setStaff, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;