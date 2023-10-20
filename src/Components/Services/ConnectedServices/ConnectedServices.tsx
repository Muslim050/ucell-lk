import React from "react";
import styles from "./ConnectedServices.module.scss";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { fetchServices } from "src/core/store/services/services.thunks";
import { ReactComponent as Arrow2 } from "src/assets/Arrow2.svg";

function ConnectedServices() {
  const dispatch = useAppDispatch();
  const [services] = useAppSelector(({ services }) => [services.services]);

  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const totalServices = services?.enabled?.reduce((total: any, item: any) => {
    if (item.items && Array.isArray(item.items)) {
      return total + item.items.length;
    }
    return total;
  }, 0);

  return (
    <>
      <div className={styles.connected}>
        <div className={styles.connected__wrapper}>
          <div className={styles.connected__wrapper__title}>
            Подключенные услуги
            <div className={styles.connected__wrapper__subtitle}>
              Услуги, опции, сервисы
            </div>
          </div>

          <div className={styles.connected__wrapper__subtitle}>
            Подключено: {totalServices}
            <button className={styles.connected__wrapper__subtitle_btn}>
              <Arrow2
                style={{
                  width: "15px",
                  height: "15px",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectedServices;
