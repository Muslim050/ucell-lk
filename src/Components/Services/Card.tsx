import React from "react";
import styles from "./ServicesCard.module.scss";
import { ItemInterface } from "src/core/models/services.interface";
import { useAppDispatch } from "src/core/utils/hooks/redux";
import {
  showModalConfirmedServices,
  showModalDisabledServices,
} from "src/core/store/modal/modal.slice";

interface ServicesCardInfoProps {
  item?: ItemInterface;
}

const Card: React.FC<ServicesCardInfoProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = React.useState(item?.enabled);
  const toggleEnabled = (id: string, enabled: boolean) => {
    if (enabled === false) {
      dispatch(showModalConfirmedServices(item));

      setToggle((prevEnabled) => {
        const enabledString = enabled ? "disable" : "enable";
        return !prevEnabled;
      });
    } else if (enabled === true) {
      dispatch(showModalDisabledServices(item));
    }
  };
  React.useEffect(() => {
    setToggle(item?.enabled);
  }, [item]);
  console.log("itemitemitem", item);

  if (!item) {
    return null;
  }
  // console.log("serviceserviceservice", service);

  return (
    <div className={styles.cardInfo}>
      <div className={styles.cardInfo__wrapper}>
        <div className={styles.cardInfo__title}>
          {item.name}
          <div
            className={styles.cardInfo__subtitle}
            style={{ color: item?.renewal_period?.color }}
          >
            {item?.renewal_period?.text}
          </div>
        </div>

        <div>
          <div
            className={`${styles.toggle} ${
              toggle ? styles.active : styles.inactive
            }`}
            onClick={() => toggleEnabled(item.id, item.enabled)}
          >
            <div className={styles.ball}></div>
          </div>
        </div>
      </div>

      <div className={styles.cardInfo__info}>{item.short_description}</div>

      <div className={styles.cardInfo__priceWrapper}>
        <div className={styles.cardInfo__price}>{item.price_highlight}</div>
      </div>
    </div>
  );
};

export default Card;
