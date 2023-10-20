import React from 'react';
import styles from './TariffPlanCard.module.scss';

function TariffPlanAdvantages() {
  return (
    <div>
      <div className={styles.subscriptionFee__title}>Преимущества тарифа</div>
      <div
        style={{
          display: 'flex',
          marginTop: '5px',
          justifyContent: 'space-between'
        }}
      >
        <div className={styles.imageUnlim}></div>
        <div className={styles.imageLimit}></div>
        <div className={styles.imageLifeZero}></div>
        <div className={styles.imageControl}></div>
      </div>
    </div>
  );
}

export default TariffPlanAdvantages;
