import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  liveAmount?: string;
  initialAmount?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  liveAmount,
  initialAmount,
  color,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const liveAmountAsNumber = parseFloat(liveAmount || "0");
    const initialAmountAsNumber = parseFloat(initialAmount || "1");

    const timeout = setTimeout(() => {
      const newProgress = Math.round(
        (liveAmountAsNumber / initialAmountAsNumber) * 100
      );
      setProgress(newProgress);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [liveAmount, initialAmount]);

  // if (initialAmount === -1 || initialAmount === undefined) {
  //   return (
  //     <div style={{ marginTop: '10px' }}>
  //       {/* Отображение SVG-изображения */}
  //       <Unlim />
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
