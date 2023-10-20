import { createSlice } from "@reduxjs/toolkit";
import {
  fetchExpenses,
  fetchExpensesReport,
  getExpensesReport,
} from "./expenses.thunks";
import { ExpensesscreenState } from "./expenses.types";

const initialState: ExpensesscreenState = {
  status: "loading",
  expensive: [],
  getExpRep: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state) => {
        state.status = "loaded";
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.status = "error";
      })

      .addCase(fetchExpensesReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpensesReport.fulfilled, (state, action) => {
        state.status = "loaded";
        state.expensive = action.payload;
        console.log("actionaction", action);
      })
      .addCase(fetchExpensesReport.rejected, (state) => {
        state.status = "error";
      })

      .addCase(getExpensesReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpensesReport.fulfilled, (state, action) => {
        state.status = "loaded";
        state.getExpRep = action.payload;
      })
      .addCase(getExpensesReport.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const expensesReducer = expensesSlice.reducer;
