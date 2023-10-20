import { ItemInterface } from "src/core/models/services.interface";
import React from "react";
import ServicesCard from "./ServicesCard";
import styles from "./ServicesCard.module.scss";

interface ServicesCardInfoProps {
  item?: ItemInterface;
}

const ServicesCardInfo: React.FC<ServicesCardInfoProps> = ({ item }) => {
  return (
    <div className={styles.services}>
      <ServicesCard service={item} />
    </div>
  );
};

export default ServicesCardInfo;
