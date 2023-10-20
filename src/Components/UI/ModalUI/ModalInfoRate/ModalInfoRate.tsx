import { ReactComponent as Close } from "src/assets/Close.svg";
import { ReactComponent as Phone } from "src/assets/PersonalArea/Phone.svg";
import { ReactComponent as Arrow } from "src/assets/PersonalArea/Arrow.svg";
import { AnimatePresence } from "framer-motion";
import styles from "../ModalUI.module.scss";
import { ReactComponent as Infinity } from "src/assets/main/Infinity.svg";

import { ModalUI } from "../ModalUI";
import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import DropdownUI from "../../Dropdown/DropdownUI";
import {
  hideModalRate,
  hideModalRestart,
  showModalRate,
  showModalRestart,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";

import style from "./ModalInfoRate.module.scss";
import { fetchMyRate } from "src/core/store/rate/rate.thunks";

const ModalInfoRate = () => {
  const dispatch = useAppDispatch();
  const { showRate, showRestart } = useAppSelector((state) => state.modal);
  const { rate } = useAppSelector((state) => state);

  const infoMyRate = rate?.myRate;

  const restartButton = () => {
    dispatch(hideModalRate());
    dispatch(showModalRestart());
  };

  React.useEffect(() => {
    dispatch(fetchMyRate());
  }, [dispatch]);

  return (
    <>
      <AnimatePresence>
        {showRate && (
          <ModalUI>
            <div className="modal_header">
              <div className="modal_header__title">
                {infoMyRate && infoMyRate.header}
              </div>
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalRate())}
              >
                <Close />
              </button>
            </div>
            <div className={style.InfoRate}>
              <div className={style.InfoRate__LeftBlock}>
                <div className={style.InfoRate__LeftBlock_wrapper}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "22px",
                        lineHeight: "28px",
                        marginBottom: "15px",
                      }}
                    >
                      {infoMyRate && infoMyRate.rate_plan.name}
                    </div>

                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "15px",
                        lineHeight: "24px",
                        marginTop: "15px",
                      }}
                    >
                      {infoMyRate && infoMyRate.rate_plan.renewal_price.header}
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "22px",
                          lineHeight: "28px",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        {infoMyRate && infoMyRate.rate_plan.renewal_price.text}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #ffffff69",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "15px",
                        lineHeight: "24px",
                        marginTop: "15px",
                      }}
                    >
                      {infoMyRate && infoMyRate.rate_plan.renewal_period.header}
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          lineHeight: "18px",
                        }}
                      >
                        {infoMyRate && infoMyRate.rate_plan.renewal_period.text}
                      </div>
                    </div>
                    {infoMyRate && infoMyRate.restartable && (
                      <div>
                        <button
                          onClick={() => restartButton()}
                          style={{
                            background: "#F6F1FF",
                            borderRadius: "4px",
                            border: "0",
                            fontWeight: "600",
                            fontSize: "12px",
                            lineHeight: "14px",
                            color: "#7220A3",
                            padding: "4.5px 10.5px",
                            cursor: "pointer",
                          }}
                        >
                          RESTART
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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

                  {infoMyRate &&
                    infoMyRate.counters.map((item: any, index: string) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderBottom: "1px solid #EDEDED",
                          paddingBottom: "15px",
                          marginTop: "16px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "15px",
                            lineHeight: "18px",

                            width:
                              item.name.includes("Telegram") ||
                              item.name.includes("WhatsApp") ||
                              item.name.includes("Facebook") ||
                              item.name.includes("Instagram")
                                ? "200px"
                                : "150px",
                          }}
                        >
                          {item.name}

                          {item.unlimited === true ? null : (
                            <ProgressBar
                              liveAmount={item.value.live as string | undefined}
                              initialAmount={
                                item.value.initial as string | undefined
                              }
                              color={item.color as string | undefined}
                            />
                          )}
                        </div>

                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "14px",
                            color: "#999999",
                            // width: '120px'
                          }}
                        >
                          {item.unlimited === true ? (
                            <div
                              style={{
                                height: "49%",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Infinity />
                            </div>
                          ) : (
                            <div>Осталось:</div>
                          )}
                          <div
                            style={{
                              fontWeight: "600",
                              fontSize: "15px",
                              lineHeight: "18px",
                              marginTop: "5px",
                            }}
                          >
                            <span style={{ marginRight: "5px" }}>
                              {item.value.live}
                            </span>
                            {item.value.separator}
                            <span
                              style={{ color: "#333333", marginLeft: "5px" }}
                            >
                              {/* {tariff && tariff.counters[1].value.initial} Мб */}
                              {item.value.initial}
                              {item.value.unit}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                <DropdownUI
                  price={infoMyRate && infoMyRate.rate_plan.properties}
                />
              </div>

              {/* Правый Блок */}
              <div className={style.InfoRate__RightBlock}>
                <div>
                  <ul style={{ marginTop: "30px" }}>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #EDEDED",
                        paddingBottom: "15px",
                      }}
                    >
                      {/* <Like /> */}

                      <img
                        style={{ width: "100px" }}
                        src={
                          (infoMyRate &&
                            infoMyRate.rate_plan.advantages.promo_image) ||
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
                        {infoMyRate && infoMyRate.rate_plan.advantages.header}
                      </div>
                    </li>

                    {infoMyRate &&
                      infoMyRate.rate_plan.advantages.advantage_items.map(
                        (item: any, index: string) => (
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
                            {/* <Internet /> */}

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
                        )
                      )}
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
                <button className={styles.btn}>Сменить тариф</button>
              </div>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRestart && (
          <ModalUI>
            <div className="modal_header">
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalRestart())}
              >
                <Close />
              </button>
            </div>

            <div
              style={{ width: "310px", marginTop: "30px", textAlign: "center" }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  marginBottom: "8px",
                }}
              >
                Активировать “Restart”?
              </div>
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#999999",
                }}
              >
                С вашего баланса спишется абонентская плата 12,000 сумов и будут
                назначены новые лимиты на месяц. Остаток прежних лимитов по
                тарифу обнулится.
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "grid",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <button className={styles.btn} style={{ marginBottom: "10px" }}>
                  Да
                </button>

                <button
                  className={styles.btn__disabled}
                  onClick={() => {
                    dispatch(hideModalRestart());
                    dispatch(showModalRate());
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalInfoRate;
