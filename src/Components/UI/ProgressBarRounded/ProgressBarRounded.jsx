import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBarRounded({ liveAmount, initialAmount, color }) {
  console.log(color);
  const progress = ((initialAmount - liveAmount) / (initialAmount - 0)) * 100;

  return (
    <div style={{ width: "52px" }}>
      <CircularProgressbar
        value={progress}
        styles={{
          path: {
            stroke: color,
          },
        }}
      />
    </div>
  );
}

export default ProgressBarRounded;
