import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface FavouritesState {
  items: number[];
}

const initialState: FavouritesState = {
  items: [],
};

export const loadFavouritesForUser = createAsyncThunk(
  'favourites/loadForUser',
  async (userId: string) => {
    const key = `favourites:${userId}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
);

export const addFavouriteForUser = createAsyncThunk(
  'favourites/addForUser',
  async (payload: { userId: string; id: number }) => {
    const { userId, id } = payload;
    const key = `favourites:${userId}`;
    const data = await AsyncStorage.getItem(key);
    const items: number[] = data ? JSON.parse(data) : [];
    if (!items.includes(id)) items.push(id);
    await AsyncStorage.setItem(key, JSON.stringify(items));
    return items;
  }
);

export const removeFavouriteForUser = createAsyncThunk(
  'favourites/removeForUser',
  async (payload: { userId: string; id: number }) => {
    const { userId, id } = payload;
    const key = `favourites:${userId}`;
    const data = await AsyncStorage.getItem(key);
    const items: number[] = data ? JSON.parse(data) : [];
    const newItems = items.filter((i) => i !== id);
    await AsyncStorage.setItem(key, JSON.stringify(newItems));
    return newItems;
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    clearFavourites: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavouritesForUser.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addFavouriteForUser.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFavouriteForUser.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
