import React from "react";
import styles from "./MyRateCard.module.scss";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { fetchMyRate } from "src/core/store/rate/rate.thunks";
import { ReactComponent as Infinity } from "src/assets/main/Infinity.svg";

export interface MyRateInterface {
  active: boolean;
  counters: {
    current: [
      {
        type: string;
        name: string;
        initial_amount: { text: string; value: number };
        live_amount?: { text: string; value: number };
        additional_information: string;
        color: string;
      }
    ];
    restartable: boolean;
  };
  current: boolean;
  external_information: string;
  id: string;
  name: string;
  properties: PropertyInterface[];

  renewal_price: {
    next_payment_date: string;
    renewal_period: string;
    unit: string;
    value: number;
  };
}

export interface PropertyInterface {
  header: {
    text_left: string;
  };
  items: PropertyItemInterface[];
}
export interface PropertyItemInterface {
  text_left: string;
  text_right?: string;
}

const MyRateCard = () => {
  const dispatch = useAppDispatch();
  const { rate } = useAppSelector((state) => state);

  const infoMyRate = rate?.myRate;
  // const infoRatePlan = async () => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     await axios
  //       .get(`rate_plans/current`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-User-Agent': 'ucell/android/1.4.3',
  //           'X-Authorization': token,
  //           'Accept-Language': 'ru'
  //         },
  //         responseType: 'json',
  //         data: JSON.stringify({})
  //       })
  //       .then(function (response) {
  //         return setRate(response.data.rate_plan);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    dispatch(fetchMyRate());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfo__gWrapper}>
          <div className={styles.cardInfo__wrapper}>
            <div className={styles.cardInfo__titleWrapper}>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "rgba(51, 51, 51, 0.40)",
                    marginBottom: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  {infoMyRate && infoMyRate.rate_plan.name.split(" ")[0]}
                </div>
                <div
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {infoMyRate && infoMyRate.rate_plan.name}
                </div>
              </div>
              <div className={styles.cardInfo__count}>
                <div className={styles.cardInfo__count__title}>
                  {infoMyRate && infoMyRate.rate_plan.renewal_price.header}
                </div>
                <div
                  className={styles.cardInfo__count__subtitle}
                  style={{ display: "flex" }}
                >
                  {infoMyRate && infoMyRate.rate_plan.renewal_price.text}
                </div>
              </div>
            </div>
          </div>
          <ul className={styles.infoCard}>
            <li className={styles.infoCard__wrapper} style={{ height: "100%" }}>
              <div
                className={styles.infoCard__limit}
                style={{
                  height: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <div
                  className={styles.infoCard__limit_title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {infoMyRate &&
                    infoMyRate.counters.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
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
                          <div>
                            <span
                              style={{ fontSize: "15px", fontWeight: "700" }}
                            >
                              {item.value.initial}
                            </span>
                            <span
                              style={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {item.value.unit}
                            </span>
                          </div>
                        )}
                        <span>{item.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyRateCard;
