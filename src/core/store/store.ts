import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/auth.slice";
import { expensesReducer } from "./expenses/expenses.slice";
import { infoReducer } from "./info/info.slice";
import modalSlice from "./modal/modal.slice";
import { rateReducer } from "./rate/rate.slice";
import { servicesReducer } from "./services/services.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mainscreen: infoReducer,
    modal: modalSlice,
    services: servicesReducer,
    rate: rateReducer,
    expenses: expensesReducer,
  },
});
