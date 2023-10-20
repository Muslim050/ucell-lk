import { ReactComponent as Close } from "src/assets/Close.svg";
import { AnimatePresence } from "framer-motion";
// import "react-datepicker/dist/react-datepicker.css";
import "react-day-picker/dist/style.css";
import { ru } from "date-fns/locale";
import styles from "../ModalUI.module.scss";
import style from "./ModalDetailing.module.scss";

import { ModalUI } from "../ModalUI";
import {
  fetchExpensesReport,
  getExpensesReport,
} from "src/core/store/expenses/expenses.thunks";
import { ReactComponent as Detalisation } from "src/assets/PersonalArea/Detalisation.svg";
import { ReactComponent as DownloadReport } from "src/assets/PersonalArea/DownloadReport.svg";
import React, { useState } from "react";
import {
  hideModalDetailing,
  showPopUpModal,
} from "src/core/store/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { addDays } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    color: white;
    border: 2px solid #7220A3;
    background: #7220A3;

  }
  .my-selected:hover:not([disabled]) { 
    border-color: #ad70d2;
    background: #ad70d2;
    color: #ad70d2;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

const fixedSum = [
  { id: 1, count: "30 000" },
  { id: 2, count: "40 000" },
  { id: 3, count: "50 000" },
];

const pastMonth = new Date();

export const ModalDetailing = () => {
  const dispatch = useAppDispatch();
  const { showDetailing } = useAppSelector((state) => state.modal);
  const { mainscreen } = useAppSelector((state) => state.mainscreen);
  const { getExpRep, expensive } = useAppSelector((state) => state.expenses);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const msisdn = mainscreen?.msisdn.msisdn;
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 0),
  };
  const [range, setRange] = React.useState<DateRange | undefined>(
    defaultSelected
  );

  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "xls">("pdf");
  const handlePdfFormat = () => setSelectedFormat("pdf");
  const handleXlsFormat = () => setSelectedFormat("xls");
  function formatDateToYYYYMMDD(date: Date | undefined) {
    if (!date) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handlePayment = async () => {
    if (!buttonDisabled) {
      if (range?.from && range?.to) {
        const fromFormatted = formatDateToYYYYMMDD(range.from);
        const toFormatted = formatDateToYYYYMMDD(range.to);
        setButtonDisabled(true);

        try {
          const response = await dispatch(
            fetchExpensesReport({ fromFormatted, toFormatted, selectedFormat })
          );

          if (fetchExpensesReport.rejected.match(response)) {
            dispatch(hideModalDetailing());
            dispatch(
              showPopUpModal({
                type: "error",
                message: "Ошибка: " + response.error.message,
              })
            );
          } else if (fetchExpensesReport.fulfilled.match(response)) {
            dispatch(hideModalDetailing());
            dispatch(
              showPopUpModal({
                type: "success",
                message:
                  "Отчет успешно запрошен в период с " +
                  fromFormatted +
                  " по " +
                  toFormatted,
              })
            );
          }

          setButtonDisabled(false);
        } catch (error: any) {
          dispatch(hideModalDetailing());
          dispatch(
            showPopUpModal({
              type: "error",
              message:
                "Произошла ошибка при отправке запроса: " + error.message,
            })
          );
          setButtonDisabled(false);
        }
      } else {
        console.log("Диапазон дат не выбран.");
      }
    }
  };
  React.useEffect(() => {
    dispatch(getExpensesReport());
  }, []);

  const currentDate = new Date(); // Replace this with your current date logic

  const isDateDisabled = (date: Date) => {
    return date > currentDate;
  };

  const closeModalExp = () => {
    dispatch(hideModalDetailing());
    setRange(undefined);
  };

  return (
    <>
      <AnimatePresence>
        {showDetailing && (
          <ModalUI>
            <div className="modal_header" style={{ marginBottom: "0px" }}>
              <div className="modal_header__title">Заказ детализации</div>
              <button className="close_icon" onClick={closeModalExp}>
                <Close />
              </button>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <style>{css}</style>

                <DayPicker
                  id="test"
                  mode="range"
                  defaultMonth={pastMonth}
                  selected={range}
                  footer={
                    "Заказать детализацию можно только за выбранный полный месяц либо за 3 дня"
                  }
                  modifiersClassNames={{
                    selected: "my-selected",
                    today: "my-today",
                  }}
                  modifiersStyles={{
                    disabled: { fontSize: "75%" },
                  }}
                  onSelect={setRange}
                  disabled={isDateDisabled} // Use the isDateDisabled function as the disabled prop
                  ISOWeek
                  locale={ru}
                />
              </div>

              <div
                style={{
                  width: "340px",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #EDEDED",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#333333",
                      fontWeight: "400",
                      marginBottom: "20px",
                    }}
                  >
                    Об остатке на счете, расходах и другие в PDF или XLS будет
                    доступен на странице Заказ детализации
                  </p>
                  <div>
                    <p
                      style={{
                        color: "#999999",
                        fontSize: "15px",
                        lineHeight: "18px",
                        marginBottom: "5px",
                      }}
                    >
                      Формат отчета
                    </p>
                    <button
                      style={{
                        padding: "7px 16px",
                        borderRadius: "32px",
                        background:
                          selectedFormat === "pdf" ? "#00B48C" : "#F5F7FA",
                        color: selectedFormat === "pdf" ? "white" : "#999999",
                        marginRight: "10px",
                        marginBottom: "20px",
                      }}
                      onClick={handlePdfFormat}
                    >
                      PDF
                    </button>
                    <button
                      style={{
                        padding: "7px 16px",
                        borderRadius: "32px",
                        background:
                          selectedFormat === "xls" ? "#00B48C" : "#F5F7FA",
                        color: selectedFormat === "xls" ? "white" : "#999999",
                        marginBottom: "20px",
                      }}
                      onClick={handleXlsFormat}
                    >
                      XLS
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <p style={{ marginBottom: "18px" }}>Последние отчеты</p>

                  {getExpRep?.map((item: any, index: string) => {
                    return (
                      <div key={index} className={style.expenses_download}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Detalisation style={{ marginRight: "10px" }} />
                          {item.title}
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            style={{ background: "inherit", cursor: "pointer" }}
                          >
                            <DownloadReport />
                          </button>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <button
                className={styles.btn}
                onClick={handlePayment}
                disabled={buttonDisabled}
              >
                Получить отчет
              </button>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};
