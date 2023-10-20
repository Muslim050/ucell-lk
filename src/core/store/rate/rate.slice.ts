import { createSlice } from "@reduxjs/toolkit";
import {
  changeRate,
  fetchRate,
  fetchMyRate,
  fetchDetailRate,
} from "./rate.thunks";
import { RateState } from "./rate.types";

const initialState: RateState = {
  rate: null,
  status: "loading",
  myRate: null,
  detailRate: null,
  specificRate: null,
};

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.rate = action.payload;
      })
      .addCase(fetchRate.rejected, (state) => {
        state.status = "error";
      })
      .addCase(changeRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeRate.fulfilled, (state, action) => {
        state.status = "loaded";
      })
      .addCase(changeRate.rejected, (state) => {
        state.status = "error";
      })

      .addCase(fetchMyRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyRate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.myRate = action.payload;
      })
      .addCase(fetchMyRate.rejected, (state) => {
        state.status = "error";
      })

      .addCase(fetchDetailRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailRate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.detailRate = action.payload;
      })
      .addCase(fetchDetailRate.rejected, (state) => {
        state.status = "error";
      });
    // .addCase(fetchSpecificRate.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(fetchSpecificRate.fulfilled, (state, action) => {
    //   state.status = 'loaded';
    //   state.specificRate = action.payload;
    // })
    // .addCase(fetchSpecificRate.rejected, (state) => {
    //   state.status = 'error';
    // });
  },
});

export const rateReducer = rateSlice.reducer;
