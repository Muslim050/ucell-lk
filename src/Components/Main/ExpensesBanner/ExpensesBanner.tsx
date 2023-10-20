import React from "react";
import Progress from "./Progress";
import styles from "./ExpensesBanner.module.scss";

import { ExpensesInterface } from "src/core/models/mainscreen.interface";
import FormatterView from "../../UI/Formatter/FormatterView";

interface ExpensesProps {
  expenses?: ExpensesInterface;
}

// Карта Расходов
const ExpensesBanner: React.FC<ExpensesProps> = ({ expenses }) => {
  const hasNoExpenses =
    expenses && expenses.categories.every((category) => category.total === 0);

  return (
    <>
      {expenses && expenses.categories.map((item: any) => item.includes)}
      <div
        style={{
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "24px",
          marginBottom: "10px",
        }}
      >
        Расходы
      </div>
      <div className={styles.expensesBanner}>
        {hasNoExpenses ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginLeft: "13px",
                color: "#7220A3",
                maxWidth: "100%",
              }}
            >
              {expenses?.period}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginLeft: "13px",
                color: "#7220A3",
                maxWidth: "100%",
              }}
            >
              Расходов нет
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "15px", fontWeight: "600" }}>
                {expenses?.period}
              </div>
              <div
                style={{ display: "flex", fontSize: "15px", fontWeight: "600" }}
              >
                <FormatterView data={expenses?.total} />
                &nbsp;сум
              </div>
            </div>
            <div>
              {expenses && <Progress categories={expenses.categories} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExpensesBanner;
