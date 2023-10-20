import { createSlice } from '@reduxjs/toolkit';
import { fetchFIO, fetchInfo } from './info.thunks';
import { MainscreenState } from './info.types';

const initialState: MainscreenState = {
  mainscreen: null,
  status: 'loading',
  fio: null
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.mainscreen = action.payload;
      })
      .addCase(fetchInfo.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchFIO.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFIO.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.fio = action.payload;
      })
      .addCase(fetchFIO.rejected, (state) => {
        state.status = 'error';
      });
  }
});

export const infoReducer = infoSlice.reducer;
