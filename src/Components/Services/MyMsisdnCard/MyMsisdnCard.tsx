import styles from "./MyMsisdnCard.module.scss";
import { ReactComponent as Plus } from "src/assets/Plus.svg";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { showModalPayment } from "src/core/store/modal/modal.slice";
import FormatterView from "src/Components/UI/Formatter/FormatterView";
import { fetchInfo } from "src/core/store/info/info.thunks";
import React from "react";

function MyMsisdnCard() {
  const dispatch = useAppDispatch();
  const { mainscreen } = useAppSelector((state) => state.mainscreen);
  const msisdn = mainscreen?.msisdn;
  const balance = mainscreen?.balance;

  React.useEffect(() => {
    dispatch(fetchInfo());
  }, [dispatch]);

  return (
    <>
      <div className={styles.msisdn}>
        <div className={styles.msisdnWrapper}>
          <div>
            <div className={styles.msisdn__wrapper_msisdn}>
              {msisdn && (
                <div className={styles.msisdn__msisdn}>{msisdn.msisdn}</div>
              )}
            </div>
          </div>

          <div className={styles.balances__wrapper}>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  lineHeight: "12px",
                  color: "#898989",
                }}
              >
                Баланс
              </div>
              {balance && (
                <div className={styles.balances__wrapper__balance}>
                  {/* {+balance.balance.toString().slice(0, -2).toLocaleString()} */}
                  {/* {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                  <FormatterView data={balance.balance} />
                  <span style={{ fontSize: "12px", lineHeight: "14px" }}>
                    сум
                  </span>
                </div>
              )}
            </div>
            <div className={styles.balances__wrapper__btn}>
              <button
                className={styles.btn}
                onClick={() => {
                  dispatch(showModalPayment());
                }}
              >
                <Plus style={{ marginRight: "7px" }} />
                Пополнить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyMsisdnCard;
