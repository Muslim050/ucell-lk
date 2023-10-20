import React from "react";
import styles from "./CardRate.module.scss";
import { RateInterface } from "src/core/models/rate.interface";
import { useAppDispatch } from "src/core/utils/hooks/redux";
import { showModalRateСonfirm } from "src/core/store/modal/modal.slice";

interface CardRateProps {
  rate?: RateInterface;
}

const CardRate: React.FC<CardRateProps> = ({ rate }) => {
  const dispatch = useAppDispatch();
  const handleRateSelection = (plans: any) => {
    dispatch(showModalRateСonfirm(plans));
  };
  const hasUnlimitedTraffic =
    rate &&
    rate.included_traffic.some((item) => item.amount.text === "Безлимитно");

  return (
    <>
      <div className={styles.cardInfo}>
        <div>
          <div className={styles.cardInfo__wrapper}>
            <div className={styles.cardInfo__titleWrapper}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "rgba(51, 51, 51, 0.40)",
                  marginBottom: "10px",
                }}
              >
                {rate && rate.name && rate.name.split(" ")[0]}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "500" }}>
                {rate && rate.name}
              </div>
              {/* <div className={styles.cardInfo__titleWrapper__xit}>XIT</div> */}
            </div>
          </div>
          <ul className={styles.infoCard}>
            {/* {hasUnlimitedTraffic && ( */}
            <li className={styles.infoCard__wrapper__icon}>
              <div className={styles.infoCard__limit_title}>
                {rate &&
                  rate.included_traffic.map((item, index) => {
                    if (
                      (item.item_name.toLowerCase().includes("интернет") ||
                        item.item_name.toLowerCase().includes("internet")) &&
                      item.amount.value !== 0
                    ) {
                      return <span key={index}>{item.amount.text}</span>;
                    }
                    return null;
                  })}
              </div>

              {hasUnlimitedTraffic &&
                rate.included_traffic.map((item, index) => {
                  if (
                    item.amount.text === "Безлимитно" &&
                    item.type === "internet"
                  ) {
                    return (
                      <>
                        <div className={styles.infoCard__icon}>
                          <span key={index}>
                            <div className={styles.infoCard__title}>
                              Безлимит на&nbsp;
                              {item.item_name}
                            </div>
                          </span>
                        </div>
                      </>
                    );
                  }
                  return null;
                })}
            </li>

            <li className={styles.infoCard__wrapper}>
              <div className={styles.infoCard__limit_title}>
                {rate &&
                  rate.included_traffic.map((item, index) => {
                    if (item.type === "voice") {
                      return (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {item.item_name}
                          </span>

                          {item.amount.value === 0 && null}

                          {item.amount.text && (
                            <span
                              style={{
                                fontSize: "16px",
                                marginLeft: "10px",
                                fontWeight: "500",
                              }}
                            >
                              {item.amount.text}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </li>

            <li className={styles.infoCard__wrapper}>
              <div className={styles.infoCard__limit}>
                <div className={styles.infoCard__limit_title}>
                  {rate &&
                    rate.included_traffic.map((item, index) => {
                      if (item.type === "sms") {
                        return <span key={index}>{item.amount.text} </span>;
                      }
                      return null;
                    })}

                  <div className={styles.infoCard__icon}>
                    <div
                      className={styles.infoCard__title}
                      style={{ fontSize: "12px", fontWeight: "500" }}
                    >
                      {rate && rate.properties.map((i) => i.header.text_left)}
                    </div>
                    <ul>
                      <li>
                        {rate &&
                          rate.properties.map((i, index) => {
                            const itemsTextArray = i.items.map(
                              (items) => items.text_right
                            );
                            const uniqueItems = Array.from(
                              new Set(itemsTextArray)
                            );

                            const itemsText = uniqueItems.join(", ");

                            return (
                              <div
                                key={index}
                                className={styles.infoCard__title}
                              >
                                <div>{itemsText}</div>
                              </div>
                            );
                          })}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.cardInfo__count}>
          <div
            className={styles.cardInfo__count__subtitle}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {rate && rate.renewal_price.text}
          </div>

          <button
            className={styles.cardInfo__count__btn}
            onClick={() => {
              if (rate) {
                handleRateSelection(rate); // Invoke the onSelectRate callback with a valid rate object
              }
            }}
          >
            Перейти на тариф
          </button>
        </div>
      </div>
    </>
  );
};

export default CardRate;
