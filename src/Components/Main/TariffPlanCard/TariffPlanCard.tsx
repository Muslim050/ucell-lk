import React from 'react';
import styles from './TariffPlanCard.module.scss';
import { TariffInterface } from '@core/models/mainscreen.interface';
import TariffPlanFooter from './TariffPlanFooter';
import TariffPlanAdvantages from './TariffPlanAdvantages';
import TariffPlanVoice from './Limits/TariffPlanVoice';
import TariffPlanInternet from './Limits/TariffPlanInternet';
import TariffPlanSms from './Limits/TariffPlanSms';

interface TariffPlanCardProps {
  tariff?: TariffInterface;
}

const TariffPlanCard: React.FC<TariffPlanCardProps> = ({ tariff }) => {
  return (
    <>
      <div className={styles.tariffplan}>
        <div className={styles.tariffplanWrapper}>
          <div>
            <div className={styles.tariffplan__wrapper_tp}>
              <div className={styles.tariffplan__tariffplanTitle}>
                Ваш тариф
              </div>
              {tariff && (
                <div className={styles.tariffplan__tariffplanName}>
                  {tariff.name}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={styles.limits}>
              {/* МИНУТЫ  */}
              <TariffPlanVoice tariff={tariff} />
              {/* МИНУТЫ */}

              {/* ИНТЕРНЕТ  */}
              <TariffPlanInternet tariff={tariff} />
              {/* ИНТЕРНЕТ */}

              {/* СМС */}
              <TariffPlanSms tariff={tariff} />
              {/* СМС  */}
            </div>

            {/* Преимущества тарифа */}
            <TariffPlanAdvantages />
            {/* Преимущества тарифа */}
          </div>

          {/* Абонентская плата / Списание */}
          <TariffPlanFooter tariff={tariff} />
          {/* Абонентская плата / Списание */}
        </div>
      </div>
    </>
  );
};

export default TariffPlanCard;
