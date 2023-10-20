import { ReactComponent as Close } from "src/assets/Close.svg";
import { AnimatePresence } from "framer-motion";
import styles from "../ModalUI.module.scss";
import style from "./ModalRateConfirmation.module.scss";
import { ReactComponent as Arrow } from "src/assets/PersonalArea/Arrow.svg";
import { ReactComponent as Phone } from "src/assets/PersonalArea/Phone.svg";
import { ModalUI } from "../ModalUI";
import DropdownUI from "../../Dropdown/DropdownUI";
import {
  hideModalRateConfirm,
  showModalRateСonfirmation,
  showPopUpModal,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { changeRate } from "src/core/store/rate/rate.thunks";
import React from "react";

const ModalRateСonfirmation = () => {
  const dispatch = useAppDispatch();
  const { showRateConfirm, infoRate } = useAppSelector((state) => state.modal);
  // const { rate } = useAppSelector((state) => state);
  // const rateId = infoRate ? infoRate.id : null;

  // const changeRatePlan = async () => {
  //   if (rateId !== null) {
  //     const response = await dispatch(changeRate(rateId!)); // Use non-null assertion here
  //     console.log('responseresponse', response);

  //     if (!response.payload) {
  //       dispatch(hideModalRateConfirm());
  //       dispatch(showPopUpModal('error'));
  //     } else {
  //       dispatch(hideModalRateConfirm());
  //       dispatch(showPopUpModal('success'));
  //     }
  //   }
  //   dispatch(hideModalRateConfirm());
  // };

  //ПОДВЕРЖДЕНИЕ ПЕРЕХОДА
  // React.useEffect(() => {
  //   if (rateId !== null) {
  //     dispatch(fetchDetailRate({ rateId }));
  //   }
  // }, [dispatch, rateId]);

  // React.useEffect(() => {
  //   if (rateId !== null) {
  //     dispatch(fetchSpecificRate({ rateId })).then(() => setLoading(false));
  //   }
  // }, [dispatch, rateId]);
  const handleRateSelection = (plans: any) => {
    dispatch(showModalRateСonfirmation(plans));
    dispatch(hideModalRateConfirm());
  };
  return (
    <>
      <AnimatePresence>
        {showRateConfirm && (
          <ModalUI>
            <div className="modal_header">
              <div
                className="modal_header__title"
                style={{ marginRight: "50px" }}
              >
                Информация о тарифе &nbsp;
                <span
                  style={{
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#652D86",
                  }}
                >
                  {infoRate && infoRate.name}
                </span>
              </div>
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalRateConfirm())}
              >
                <Close />
              </button>
            </div>

            <div className={style.InfoRate}>
              <div className={style.InfoRate__LeftBlock}>
                <ul style={{ marginTop: "20px" }}>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #EDEDED",
                      paddingBottom: "15px",
                    }}
                  >
                    <Phone />
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "24px",
                        marginLeft: "10px",
                      }}
                    >
                      Включено в тариф
                    </div>
                  </li>

                  {infoRate &&
                    infoRate.included_traffic.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
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
                          <img
                            style={{ width: "40px" }}
                            src={item.icon}
                            alt=""
                          />
                        </div>

                        <div
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "20px",
                              lineHeight: "14px",
                              color: "#000",
                            }}
                          >
                            {item.amount.text}
                          </span>
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: "15px",
                              lineHeight: "14px",
                              color: "#555",
                              // width: '120px'
                            }}
                          >
                            {item.item_name}
                          </div>
                        </div>
                      </li>
                    ))}
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
                      {infoRate && infoRate.renewal_price.header}
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
                        {infoRate && infoRate.renewal_price.text}
                      </span>
                    </div>
                  </li>
                </ul>
                <DropdownUI price={infoRate && infoRate.properties} />
              </div>

              {/* Правый Блок */}
              <div className={style.InfoRate__RightBlock}>
                <div>
                  <ul>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #EDEDED",
                        paddingBottom: "15px",
                      }}
                    >
                      <img
                        style={{ width: "100px" }}
                        src={
                          (infoRate && infoRate.advantages.promo_image) ||
                          undefined
                        }
                        alt=""
                      />

                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "24px",
                          marginLeft: "10px",
                        }}
                      >
                        {infoRate && infoRate.advantages.header}
                      </div>
                    </li>

                    {infoRate &&
                      infoRate.advantages.advantage_items.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #EDEDED",
                            paddingBottom: "15px",
                            marginTop: "16px",
                          }}
                        >
                          <img
                            style={{ width: "30px" }}
                            src={item.icon}
                            alt=""
                          />
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: "15px",
                              lineHeight: "24px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.text}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <a href="/" className={style.more_details}>
                Подробная информация о тарифе
                <Arrow style={{ marginLeft: "10px" }} />
              </a>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <button
                  className={styles.btn}
                  onClick={() => {
                    if (infoRate) {
                      handleRateSelection(infoRate.id); // Invoke the onSelectRate callback with a valid rate object
                    }
                  }}
                >
                  Сменить тариф
                </button>
              </div>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalRateСonfirmation;
