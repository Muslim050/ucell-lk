import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ExpenseCategoryInterface } from "src/core/models/mainscreen.interface";
import FormatterView from "../../UI/Formatter/FormatterView";
ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressProps {
  categories?: ExpenseCategoryInterface[];
}

const Progress: React.FC<ProgressProps> = ({ categories }) => {
  if (!categories) {
    return null;
  }
  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.total),
        backgroundColor: categories.map((category) => category.color),
        borderRadius: 2,
        borderWidth: 2,
      },
    ],
  };
  const chartOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
    },
    cutout: "75%",
  };

  return (
    <>
      <div
        style={{
          width: "160px",
          display: "flex",
          justifyContent: "center",
          margin: "30px auto",
        }}
      >
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div>
        {categories.map((category) => (
          <div
            key={category.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span style={{ display: "flex" }}>
              <div
                style={{
                  background: category.color,
                  width: "16px",
                  height: "16px",
                  borderRadius: "20px",
                  marginRight: "10px",
                }}
              ></div>
              <div style={{ fontSize: "15px", color: "#333" }}></div>
              {category.name}:
            </span>
            <span style={{ display: "flex", fontSize: "15px" }}>
              {category.total ? <FormatterView data={category.total} /> : 0}{" "}
              &nbsp;сум
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Progress;
