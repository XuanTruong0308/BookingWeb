import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
  image?: string;
}

interface ServiceState {
  services: Service[];
  categories: any[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setServices, setCategories, selectCategory, setLoading, setError } = serviceSlice.actions;
export default serviceSlice.reducer;