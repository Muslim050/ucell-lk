import { TariffInterface } from "src/core/models/mainscreen.interface";
import React from "react";
import styles from "../TariffPlanCard.module.scss";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";

interface TariffPlanCardProps {
  tariff?: TariffInterface;
}
const TariffPlanInternet: React.FC<TariffPlanCardProps> = ({ tariff }) => {
  return (
    <div className={styles.limits__wrapper}>
      <div className={styles.limits__title}>
        {tariff && tariff.counters[1].name}
      </div>
      <div className={styles.limits__limit__wrapper}>
        <span className={styles.limits__initial}>
          {tariff && tariff.counters[1].value.initial}&nbsp;
          {tariff && tariff.counters[1].value.unit}
        </span>

        {tariff && tariff.counters[1].value.separator}

        <span className={styles.limits__live}>
          {tariff && tariff.counters[1].value.live}&nbsp;
          {tariff && tariff.counters[1].value.unit}
        </span>
      </div>

      <ProgressBar
        liveAmount={tariff && tariff.counters[1].value.live}
        initialAmount={tariff && tariff.counters[1].value.initial}
        color={tariff && tariff.counters[1].color}
      />
    </div>
  );
};

export default TariffPlanInternet;
