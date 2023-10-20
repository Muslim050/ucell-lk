import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.post(
        "/api/v1.5/expenses",
        {
          // start_date: '2023-07-01',
          // end_date: '2023-07-30'
          period_preset: "July",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
            "X-Authorization": token,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchExpensesReport = createAsyncThunk(
  "expenses/fetchExpensesReport",
  async ({
    fromFormatted,
    toFormatted,
    selectedFormat,
  }: {
    fromFormatted: string;
    toFormatted: string;
    selectedFormat: "pdf" | "xls";
  }) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.post(
        "/api/v1.5/expenses/report/request",
        {
          format: selectedFormat,
          start_date: fromFormatted,
          end_date: toFormatted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
            "X-Authorization": token,
          },
        }
      );
      return data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const getExpensesReport = createAsyncThunk(
  "expenses/getExpensesReport",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.get("/api/v1.5/expenses/reports", {
        headers: {
          "Content-Type": "application/json",
          "X-User-Agent": "ucell/android/1.4.3",
          "X-Authorization": token,
        },
      });
      console.log("getExpRepgetExpRep", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
