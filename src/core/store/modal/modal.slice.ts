import { RatePlanInterface } from "src/core/models/rate.interface";
import { ItemInterface } from "src/core/models/services.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  show: boolean;
  showRate: boolean;
  showRestart: boolean;
  showConfirmedServices: boolean;
  showDisabledServices: boolean;

  showDetailing: boolean;
  showRateConfirm: boolean;
  showRateConfirmation: boolean;

  isOpen: boolean;
  popupModal: boolean;
  infoRate: RatePlanInterface | null; // Allow null as a valid value
  servicesInfo: ItemInterface | null;
  status: string | null;
  rateId: string;
  message: string;
}

const initialState: ModalState = {
  show: false,
  showRate: false,
  showRestart: false,
  showConfirmedServices: false,
  showDisabledServices: false,
  showDetailing: false,
  showRateConfirm: false,
  showRateConfirmation: false,
  isOpen: false,
  popupModal: false,
  infoRate: null,
  rateId: "",
  servicesInfo: null,
  status: null,
  message: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalPayment: (state) => {
      state.show = true;
    },
    hideModalPayment: (state) => {
      state.show = false;
    },

    showModalRate: (state) => {
      state.showRate = true;
    },
    hideModalRate: (state) => {
      state.showRate = false;
    },

    showModalRestart: (state) => {
      state.showRestart = true;
    },
    hideModalRestart: (state) => {
      state.showRestart = false;
    },

    showModalDetailing: (state) => {
      state.showDetailing = true;
    },
    hideModalDetailing: (state) => {
      state.showDetailing = false;
    },

    showModalRateСonfirm: (state, action: PayloadAction<any>) => {
      state.showRateConfirm = true;
      state.infoRate = action.payload;
    },
    hideModalRateConfirm: (state) => {
      state.showRateConfirm = false;
    },

    showModalRateСonfirmation: (state, action: PayloadAction<any>) => {
      state.showRateConfirmation = true;
      state.rateId = action.payload;
    },
    hideModalRateConfirmation: (state) => {
      state.showRateConfirmation = false;
    },

    showPopUpModal: (
      state,
      action: PayloadAction<{ type: "success" | "error"; message: string }>
    ) => {
      state.popupModal = true;
      state.status = action.payload.type;
      state.message = action.payload.message;
    },
    hidePopUpModal: (state) => {
      state.popupModal = false;
      state.status = null;
    },
    showModalConfirmedServices: (state, action: PayloadAction<any>) => {
      state.showConfirmedServices = true;
      state.servicesInfo = action.payload;
    },
    hideModalConfirmedServices: (state) => {
      state.showConfirmedServices = false;
    },
    showModalDisabledServices: (state, action: PayloadAction<any>) => {
      state.showDisabledServices = true;
      state.servicesInfo = action.payload;
    },
    hideModalDisabledServices: (state) => {
      state.showDisabledServices = false;
    },
  },
});

export const {
  showModalPayment,
  hideModalPayment,
  showModalRate,
  hideModalRate,
  showModalRestart,
  hideModalRestart,
  showModalDetailing,
  hideModalDetailing,
  showModalRateСonfirm,
  hideModalRateConfirm,
  showPopUpModal,
  hidePopUpModal,
  showModalConfirmedServices,
  hideModalConfirmedServices,
  showModalDisabledServices,
  hideModalDisabledServices,
  showModalRateСonfirmation,
  hideModalRateConfirmation,
} = modalSlice.actions;
export default modalSlice.reducer;
