import { createSlice } from "@reduxjs/toolkit";
import { changeServices, fetchServices } from "./services.thunks";
import { ServicesState } from "./services.types";

const initialState: ServicesState = {
  services: null,
  status: "loading",
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "loaded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.status = "error";
      })
      .addCase(changeServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeServices.fulfilled, (state, action) => {
        state.status = "loaded";
      })
      .addCase(changeServices.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const servicesReducer = servicesSlice.reducer;
