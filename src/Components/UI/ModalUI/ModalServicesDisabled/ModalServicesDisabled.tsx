import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../../assets/Close.svg";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as Arrow } from "src/assets/PersonalArea/Arrow.svg";
import styles from "../ModalUI.module.scss";
import style from "./ModalServicesDisabled.module.scss";
import { ModalUI } from "../ModalUI";
import {
  hideModalDisabledServices,
  showPopUpModal,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import React from "react";
import axios from "axios";

export const ModalServicesDisabled = () => {
  const dispatch = useAppDispatch();
  const { showDisabledServices, servicesInfo } = useAppSelector(
    (state) => state.modal
  );
  const [errror, setErrror] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = async (id: string, checked: boolean) => {
    setIsLoading(true);
    const newEnabledState = checked;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "services/change",
        {
          service_id: id,
          action: newEnabledState ? "disable" : "enable",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
            "X-Authorization": token,
            "Accept-Language": "ru",
          },
          responseType: "json",
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        dispatch(hideModalDisabledServices());
        dispatch(showPopUpModal("success"));
        return response.data;
      } else {
        dispatch(showPopUpModal("error"));
      }
    } catch (error: any) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setErrror(error.response?.data?.summary);
      } else {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      <AnimatePresence>
        {showDisabledServices && (
          <ModalUI>
            <div className="modal_header">
              <div className="modal_header__title">Отключить услугу</div>
              <button
                className="close_icon"
                onClick={() => {
                  dispatch(hideModalDisabledServices());
                  setErrror("");
                }}
              >
                <Close />
              </button>
            </div>

            {servicesInfo ? (
              <div className={style.confirmedRestart__wrapper}>
                <div>
                  <div className={style.confirmedRestart__title}>
                    {servicesInfo.name}
                  </div>

                  <div
                    className={style.confirmedRestart__subtitle}
                    style={{ color: servicesInfo?.renewal_period?.color }}
                  >
                    {servicesInfo?.renewal_period?.text}
                  </div>
                </div>

                <div>
                  <div className={style.confirmedRestart__title}>Описание</div>

                  <div className={style.cardInfo__description}>
                    {servicesInfo.short_description}
                  </div>
                </div>

                <div>
                  <div className={style.confirmedRestart__title}>Стоимость</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0 ",
                      borderTop: "1px solid #EDEDED",
                      borderBottom: "1px solid #EDEDED",
                      alignItems: "center",
                    }}
                  >
                    <div className={styles.services_price}>
                      Абонентская плата
                    </div>
                    <div
                      style={{
                        background: "#F5F7FA",
                        padding: "4px 8px",
                        borderRadius: "8px",
                      }}
                    >
                      {" "}
                      {servicesInfo.price_highlight}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "red",
                  }}
                >
                  {errror}
                </div>
                <div style={{ paddingTop: "25px", textAlign: "center" }}>
                  <a
                    href="/"
                    style={{
                      color: "#7220A3",
                      fontWeight: "400",
                      fontSize: "15px",
                      lineHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Подробная информация о тарифе
                    <Arrow style={{ marginLeft: "10px" }} />
                  </a>
                  <div style={{ paddingTop: "25px" }}>
                    <button
                      className={styles.btn}
                      style={{ width: "100%" }}
                      onClick={() =>
                        handleChange(servicesInfo.id, servicesInfo.enabled)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div
                          className="loaderWrapper"
                          style={{ height: "0vh" }}
                        >
                          <div
                            className="spinner"
                            style={{
                              border: "5px solid #ffffff4d",
                              width: "30px",
                              height: "30px",
                              borderTopColor: "white",
                            }}
                          ></div>
                        </div>
                      ) : (
                        "Да"
                      )}
                    </button>
                    <button
                      style={{ marginTop: "12px", width: "100%" }}
                      className={styles.btn__disabled}
                      onClick={() => {
                        dispatch(hideModalDisabledServices());
                        setErrror("");
                      }}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};
