import React from "react";
import styles from "./DopButtonsCard.module.scss";

import { ReactComponent as ChangeTarif } from "src/assets/PersonalArea/ChangeTarif.svg";
import { ReactComponent as ChangeTarifArrow } from "src/assets/PersonalArea/ChangeTarifArrow.svg";
import { ReactComponent as Services } from "src/assets/PersonalArea/Services.svg";
import { ReactComponent as Detailing } from "src/assets/PersonalArea/Detailing.svg";
import { ReactComponent as MyPhone } from "src/assets/PersonalArea/MyPhone.svg";

import { Link } from "react-router-dom";
import {
  showModalDetailing,
  showModalRate,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch } from "src/core/utils/hooks/redux";

function DopButtonsCard() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.DopButtonCard}>
        <div className={styles.DopButtonCardWrapper}>
          <div className={styles.DopButtonCardWrapper_div}>
            <button
              onClick={() => {
                dispatch(showModalRate());
              }}
              // style={{ width: '100%' }}
              className={styles.DopButtonCard__btn}
            >
              <div className={styles.DopButtonCard__btnWrapperIcon}>
                <MyPhone
                  style={{
                    marginRight: "13px",
                  }}
                />
                Мой тариф
              </div>
              <ChangeTarifArrow />
            </button>
          </div>
          <div className={styles.DopButtonCardWrapper_div}>
            <Link to="/change-rate" className={styles.DopButtonCard__btn}>
              <div className={styles.DopButtonCard__btnWrapperIcon}>
                <ChangeTarif
                  style={{
                    marginRight: "13px",
                  }}
                />
                Сменить тариф
              </div>
              <ChangeTarifArrow />
            </Link>
          </div>

          <div className={styles.DopButtonCardWrapper_div}>
            <Link to="/change-services" className={styles.DopButtonCard__btn}>
              <div className={styles.DopButtonCard__btnWrapperIcon}>
                <Services
                  style={{
                    marginRight: "13px",
                  }}
                />
                Доступные услуги
              </div>
              <ChangeTarifArrow className={styles.DopButtonCard__btnarrow} />
            </Link>
          </div>

          <div className={styles.DopButtonCardWrapper_div}>
            <button
              className={styles.DopButtonCard__btn}
              onClick={() => {
                dispatch(showModalDetailing());
              }}
            >
              <div className={styles.DopButtonCard__btnWrapperIcon}>
                <Detailing
                  style={{
                    marginRight: "13px",
                  }}
                />
                Заказать детализцию
              </div>
              <ChangeTarifArrow />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DopButtonsCard;
