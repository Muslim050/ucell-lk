import { ReactComponent as Close } from "../../../../assets/Close.svg";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as Arrow } from "src/assets/PersonalArea/Arrow.svg";
import styles from "../ModalUI.module.scss";
import style from "./ModalServicesConfirmed.module.scss";
import { ModalUI } from "../ModalUI";
import {
  hideModalConfirmedServices,
  showPopUpModal,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import React from "react";
import axios from "axios";
import { LoaderDop } from "../../Loader/Loader";

export const ModalServicesConfirmed = () => {
  const dispatch = useAppDispatch();
  const { showConfirmedServices, servicesInfo } = useAppSelector(
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
        "/api/v1.5/services/change",
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
        dispatch(hideModalConfirmedServices());
        dispatch(
          showPopUpModal({
            type: "success",
            message:
              "Услуга " + response.data.service.name + "успешно подключена ",
          })
        );
        return response.data;
      }
    } catch (error: any) {
      setIsLoading(false);
      dispatch(hideModalConfirmedServices());
      dispatch(
        showPopUpModal({ type: "error", message: error.response.data.body })
      );
    }
  };

  return (
    <>
      <AnimatePresence>
        {showConfirmedServices && (
          <ModalUI>
            <div className="modal_header">
              <div className="modal_header__title">Подтвердите подключение</div>
              <button
                className="close_icon"
                onClick={() => {
                  dispatch(hideModalConfirmedServices());
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
                        <LoaderDop
                          width="35px"
                          height="35px"
                          wrapperHeight="10px"
                        />
                      ) : (
                        "Да"
                      )}
                    </button>
                    <button
                      style={{ marginTop: "12px", width: "100%" }}
                      className={styles.btn__disabled}
                      onClick={() => {
                        dispatch(hideModalConfirmedServices());
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

//Логика если нужно заменить услугу
// const handleChange = async (id: string, checked: boolean): Promise<any> => {
//   setIsLoading(true);

//   const newEnabledState = checked;

//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       "/api/v1.5/services/change",
//       {
//         service_id: id,
//         action: newEnabledState ? "disable" : "enable",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-User-Agent": "ucell/android/1.4.3",
//           "X-Authorization": token,
//           "Accept-Language": "ru",
//         },
//         responseType: "json",
//       }
//     );

//     setIsLoading(false);

//     if (response.status === 200) {
//       dispatch(hideModalConfirmedServices());
//       dispatch(
//         showPopUpModal({
//           type: "success",
//           message:
//             "Услуга " + response.data.service.name + " успешно подключена",
//         })
//       );
//       console.log("response.statusresponse.statusresponse.status", response);

//       return response.data;
//     } else if (response.status === 409) {
//       const userConfirmed = window.confirm("Хотите продолжить?");
//       if (userConfirmed) {
//         return handleChange(id, checked);
//       }
//     }
//   } catch (error: any) {
//     if (error.response.status === 409) {
//       const userConfirmed = window.confirm(error.response.data.body);
//       if (userConfirmed) {
//         console.log("userConfirmed", userConfirmed);

//         return handleChange(id, checked);
//       }
//     } else {
//       setIsLoading(false);
//       dispatch(hideModalConfirmedServices());
//       dispatch(
//         showPopUpModal({ type: "error", message: error.response.data.body })
//       );
//     }
//   }
// };
