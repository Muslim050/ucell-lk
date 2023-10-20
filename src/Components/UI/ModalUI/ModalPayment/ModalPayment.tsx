import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../../assets/Close.svg";
import { ReactComponent as Humo } from "../../../../assets/PersonalArea/Humo.svg";
import { ReactComponent as Utolov } from "../../../../assets/PersonalArea/Utolov.svg";
import { AnimatePresence } from "framer-motion";

import styles from "../ModalUI.module.scss";
import style from "./ModalPayment.module.scss";

import { ModalUI } from "../ModalUI";
// import { hideModalPayment } from "../../../../redux/modalSlice";

import React from "react";
import { hideModalPayment } from "src/core/store/modal/modal.slice";
import { useAppSelector } from "src/core/utils/hooks/redux";

const fixedSum = [
  { id: 1, count: "30 000" },
  { id: 2, count: "40 000" },
  { id: 3, count: "50 000" },
];

export const ModalPayment = () => {
  const dispatch = useDispatch();
  const { show } = useAppSelector((state) => state.modal);
  const { mainscreen } = useAppSelector((state) => state.mainscreen);
  const msisdn = mainscreen?.msisdn.msisdn;
  const [sum, setSum] = React.useState("");
  const [selectedSum, setSelectedSum] = React.useState("");
  const [selectedButton, setSelectedButton] = React.useState(1);

  const [cart, setCart] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");

  const handleCart = (e: any) => {
    setCart(e.target.value);
  };
  const handleMonth = (e: any) => {
    setMonth(e.target.value);
  };
  const handleYear = (e: any) => {
    setYear(e.target.value);
  };

  const handlesum = (e: any) => {
    setSum(e.target.value);
    setSelectedSum(e.target.value);
  };
  const handleClearSum = () => {
    setSum("");
    setSelectedSum("");
  };
  const handleSelectSum = (value: any) => {
    setSelectedSum(value);
    setSum("");
    setSelectedButton(value);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <ModalUI>
            <div className="modal_header">
              <div className="modal_header__title">Пополнение счета</div>
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalPayment())}
              >
                <Close />
              </button>
            </div>

            <div>
              {/* <div className={styles.modal_title}>
                <h4>Пополнить баланс</h4>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={styles.modal_title_btn}
                ></button>
              </div> */}

              <iframe
                src="https://widget.apelsin.uz/ucell?lang=ru"
                width="320"
                height="350"
                scrolling="no"
                frameBorder="0"
              ></iframe>
              {/* </form> */}
            </div>

            {/* <div className={style.Payment}>
              <div
                className={styles.modal_body}
                style={{ marginRight: '15px' }}
              >
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <div className={style.Payment__InputPhone}>
                    <div style={{ display: 'inline-grid' }}>
                      <label className={style.Payment__InputPhone__label}>
                        Номер телефона
                      </label>
                      <input
                        value={msisdn}
                        type="text"
                        style={{ border: '0', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div className={style.Payment__InputSum}>
                    <div style={{ display: 'inline-grid', width: '100% ' }}>
                      <label className={style.Payment__InputSum__label}>
                        Введите сумму
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <input
                          value={selectedSum || sum}
                          onChange={handlesum}
                          type="text"
                          style={{
                            border: '0',
                            outline: 'none'
                          }}
                        />
                        {(selectedSum !== '' || sum !== '') && (
                          <button
                            onClick={handleClearSum}
                            style={{
                              border: '0',
                              background: 'inherit',
                              cursor: 'pointer',
                              height: '23px'
                            }}
                          >
                            <Close />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {fixedSum.map((count) => (
                    <button
                      className={`${style.btnFixed} ${
                        selectedButton.toString() === count.count
                          ? style.active
                          : ''
                      }`}
                      key={count.id}
                      onClick={() => handleSelectSum(count.count)}
                    >
                      {count.count}
                    </button>
                  ))}
                </div>

                <div className={style.textSum}>
                  Сумма от 500 до 1 000 000 сум.
                </div>
              </div>

              <div className={styles.modal_body} style={{ paddingLeft: '0px' }}>
                <div className={style.Payment__PaymentCard}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Humo />
                    <Utolov style={{ marginLeft: '10px' }} />
                  </div>
                  <div
                    style={{
                      borderRadius: '12px',
                      display: 'inline-table',
                      padding: '10px 16px',
                      width: '100%',
                      marginTop: '15px',
                      background: 'white'
                    }}
                  >
                    <div style={{ display: 'inline-grid', width: '100% ' }}>
                      <label
                        style={{
                          fontWeight: '400',
                          fontSize: '12px',
                          lineHeight: '18px',
                          color: '#999999',
                          marginBottom: '2px'
                        }}
                      >
                        Номер карты
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <input
                          value={cart}
                          onChange={handleCart}
                          type="text"
                          style={{ border: '0', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '12px'
                    }}
                  >
                    <div
                      style={{
                        borderRadius: '12px',
                        display: 'inline-table',
                        padding: '10px 16px',
                        width: '100px',
                        background: 'white',
                        marginRight: '8px'
                      }}
                    >
                      <div style={{ display: 'inline-grid', width: '100% ' }}>
                        <label
                          style={{
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: '#999999',
                            marginBottom: '2px'
                          }}
                        >
                          Месяц
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <input
                            value={month}
                            onChange={handleMonth}
                            type="text"
                            style={{
                              border: '0',
                              outline: 'none',
                              width: '68px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    /
                    <div
                      style={{
                        borderRadius: '12px',
                        display: 'inline-table',
                        padding: '10px 16px',
                        width: '100px',
                        background: 'white',
                        marginLeft: '8px'
                      }}
                    >
                      <div style={{ display: 'inline-grid', width: '100% ' }}>
                        <label
                          style={{
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: '#999999',
                            marginBottom: '2px'
                          }}
                        >
                          Год
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <input
                            value={year}
                            onChange={handleYear}
                            type="text"
                            style={{
                              border: '0',
                              outline: 'none',
                              width: '68px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '25px'
              }}
            >
              <button className={styles.btn}>Пополнить счет</button>
            </div> */}
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};
