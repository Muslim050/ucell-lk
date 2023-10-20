import { TariffInterface } from "src/core/models/mainscreen.interface";
import React from "react";
import { ReactComponent as Infinity } from "src/assets/main/Infinity.svg";
import styles from "../TariffPlanCard.module.scss";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";

interface TariffPlanCardProps {
  tariff?: TariffInterface;
}
const TariffPlanVoice: React.FC<TariffPlanCardProps> = ({ tariff }) => {
  return (
    <div className={styles.limits__wrapper} style={{ marginLeft: "0" }}>
      <div className={styles.limits__title}>
        {tariff && tariff.counters[0].name}
      </div>

      <div className={styles.limits__limit__wrapper}>
        {tariff && tariff.counters[0].unlimited === true ? (
          <>{tariff && tariff.counters[0].value.live}</>
        ) : (
          <>
            <span className={styles.limits__initial}>
              {tariff && tariff.counters[0].value.initial}
            </span>
            {tariff && tariff.counters[0].value.separator}
            <span className={styles.limits__live}>
              {tariff && tariff.counters[0].value.live}
            </span>
          </>
        )}
      </div>

      {tariff && tariff.counters[0].value.live !== "Безлимитно" ? (
        <ProgressBar
          liveAmount={tariff && tariff.counters[0].value.live}
          initialAmount={tariff && tariff.counters[0].value.initial}
          color={tariff && tariff.counters[0].color}
        />
      ) : (
        <div
          style={{
            height: "49%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Infinity />
        </div>
      )}
    </div>
  );
};

export default TariffPlanVoice;
