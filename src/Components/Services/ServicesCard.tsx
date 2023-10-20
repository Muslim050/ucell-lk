import React from "react";
import styles from "./ServicesCard.module.scss";
import { ItemInterface } from "src/core/models/services.interface";
import { useAppDispatch } from "src/core/utils/hooks/redux";
import {
  showModalConfirmedServices,
  showModalDisabledServices,
} from "src/core/store/modal/modal.slice";

interface ServicesCardProps {
  service?: ItemInterface;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ service }) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = React.useState(service?.enabled);

  const toggleEnabled = (id: string, enabled: boolean) => {
    if (enabled === false) {
      dispatch(showModalConfirmedServices(service));
    } else if (enabled === true) {
      dispatch(showModalDisabledServices(service));
    }
  };
  React.useEffect(() => {
    setToggle(service?.enabled);
  }, [service?.enabled]);

  if (!service) {
    return null;
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfo__wrapper}>
          <div className={styles.cardInfo__title}>
            {service.name}
            <div
              className={styles.cardInfo__subtitle}
              style={{ color: service?.renewal_period?.color }}
            >
              {service?.renewal_period?.text}
            </div>
          </div>

          <div>
            <div
              className={`${styles.toggle} ${
                toggle ? styles.active : styles.inactive
              }`}
              onClick={() => toggleEnabled(service.id, service.enabled)}
            >
              <div className={styles.ball}></div>
            </div>
          </div>
        </div>

        <div className={styles.cardInfo__info}>{service.short_description}</div>

        <div className={styles.cardInfo__priceWrapper}>
          <div className={styles.cardInfo__price}>
            {service.price_highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
