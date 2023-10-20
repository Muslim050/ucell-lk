import React from "react";
import styles from "./TariffPlanCard.module.scss";
import { TariffInterface } from "src/core/models/mainscreen.interface";

interface TariffPlanCardProps {
  tariff?: TariffInterface;
}

const TariffPlanFooter: React.FC<TariffPlanCardProps> = ({ tariff }) => {
  return (
    <div className={styles.subscriptionFee}>
      <div className={styles.subscriptionFee__title}>
        {tariff && tariff.price.renewal_price.header}
        <div className={styles.subscriptionFee__subscriptionW}>
          {tariff && (
            <div className={styles.subscriptionFee__subscription}>
              {tariff.price.renewal_price.text}
            </div>
          )}
        </div>
      </div>

      <div className={styles.subscriptionFee__title}>
        {tariff && tariff.price.renewal_date.header}
        {tariff && (
          <div className={styles.subscriptionFee__subscriptionDate}>
            {tariff.price.renewal_date.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffPlanFooter;
