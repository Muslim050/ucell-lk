import { ReactComponent as Present } from "src/assets/present.svg";
import { ReactComponent as Plus } from "src/assets/Plus.svg";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { showModalPayment } from "src/core/store/modal/modal.slice";
import styles from "./MsisdnCard.module.scss";
import MsisdnCard_Balance from "./MsisdnCard_Balance";
import Button from "src/Components/UI/Button/Button";

function MsisdnCard() {
  const dispatch = useAppDispatch();
  const { mainscreen, fio } = useAppSelector((state) => state.mainscreen);
  const msisdn = mainscreen?.msisdn;

  return (
    <>
      <div className={styles.msisdn}>
        <div className={styles.msisdnWrapper}>
          <div className={styles.msisdn__wrapper_msisdn}>
            {msisdn && (
              <div className={styles.msisdn__msisdn}>{msisdn.msisdn}</div>
            )}
          </div>
          <div className={styles.msisdn__wrapper_fio}>{fio && fio.name}</div>

          <div className={styles.balances__wrapper}>
            {/* Баланс */}
            <MsisdnCard_Balance />
            {/* Баланс */}

            <div className={styles.btn__wrapper}>
              <Button
                color="#7220A3"
                icon={<Plus />}
                onClick={() => dispatch(showModalPayment())}
              >
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MsisdnCard;
