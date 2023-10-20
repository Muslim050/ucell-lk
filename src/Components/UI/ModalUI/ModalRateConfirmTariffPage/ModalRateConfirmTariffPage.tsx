import { ReactComponent as Close } from "src/assets/Close.svg";
import { AnimatePresence } from "framer-motion";
import styles from "../ModalUI.module.scss";
import style from "./ModalRateConfirmTariffPage.module.scss";
import { ModalUI } from "../ModalUI";
import {
  hideModalRateConfirmation,
  showPopUpModal,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { changeRate, fetchDetailRate } from "src/core/store/rate/rate.thunks";
import React from "react";

const ModalRateConfirmTariffPage = () => {
  const dispatch = useAppDispatch();
  const { showRateConfirmation, rateId } = useAppSelector(
    (state) => state.modal
  );
  const { detailRate } = useAppSelector((state) => state.rate);

  const changeRatePlan = async () => {
    if (rateId !== null) {
      const response = await dispatch(changeRate(rateId!));

      const message = (response.payload as any).error?.response.data.content
        .text;

      if (!response.payload) {
        dispatch(hideModalRateConfirmation());
        dispatch(showPopUpModal(message));
      } else {
        dispatch(hideModalRateConfirmation());
        dispatch(showPopUpModal(message));
      }
    }
    dispatch(hideModalRateConfirmation());
  };

  //ПОДВЕРЖДЕНИЕ ПЕРЕХОДА
  React.useEffect(() => {
    if (showRateConfirmation) {
      dispatch(fetchDetailRate({ rateId }));
    }
  }, [dispatch, rateId, showRateConfirmation]);

  // React.useEffect(() => {
  //   if (rateId !== null) {
  //     dispatch(fetchSpecificRate({ rateId })).then(() => setLoading(false));
  //   }
  // }, [dispatch, rateId]);

  return (
    <>
      <AnimatePresence>
        {showRateConfirmation && (
          <ModalUI>
            <div className="modal_header">
              <div
                className="modal_header__title"
                style={{ marginRight: "50px" }}
              >
                Подверждение
              </div>
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalRateConfirmation())}
              >
                <Close />
              </button>
            </div>

            <div className={style.InfoRate}>
              <div className={style.InfoRate__LeftBlock}>
                <ul>
                  <div
                    className="modal_header__title"
                    style={{ marginRight: "50px", color: "#652D86" }}
                  >
                    {detailRate && detailRate.rate_plan.name}
                  </div>

                  <li
                    style={{
                      alignItems: "center",
                      paddingBottom: "15px",
                      marginTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "15px",
                        lineHeight: "18px",
                      }}
                    >
                      {detailRate && detailRate.renewal_price.header}
                    </div>

                    <div>
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "20px",
                          lineHeight: "14px",
                          color: "#000",
                        }}
                      >
                        {detailRate && detailRate.renewal_price.text}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <button className={styles.btn} onClick={() => changeRatePlan()}>
                  Подвердить переход
                </button>
              </div>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalRateConfirmTariffPage;
