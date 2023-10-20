import React from "react";
import styles from "./ButtonsCard.module.scss";

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

function ButtonsCard() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.ButtonCard}>
        <div className={styles.ButtonCardWrapper}>
          <div>
            <button
              onClick={() => {
                dispatch(showModalRate());
              }}
              className={styles.ButtonCard__btn}
            >
              <div className={styles.ButtonCard__btnWrapperIcon}>
                <MyPhone
                  style={{
                    marginRight: "21px",
                    marginLeft: "6px",
                  }}
                />
                Мой тариф
              </div>
              <ChangeTarifArrow />
            </button>
          </div>
          <div>
            <Link to="/change-rate" className={styles.ButtonCard__btn}>
              <div className={styles.ButtonCard__btnWrapperIcon}>
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

          <div>
            <Link to="/change-services" className={styles.ButtonCard__btn}>
              <div className={styles.ButtonCard__btnWrapperIcon}>
                <Services
                  style={{
                    marginRight: "13px",
                  }}
                />
                Доступные услуги
              </div>
              <ChangeTarifArrow className={styles.ButtonCard__btnarrow} />
            </Link>
          </div>

          <div>
            <button
              className={styles.ButtonCard__btn}
              onClick={() => {
                dispatch(showModalDetailing());
              }}
            >
              <div className={styles.ButtonCard__btnWrapperIcon}>
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

export default ButtonsCard;
