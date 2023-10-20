import { useAppSelector } from "src/core/utils/hooks/redux";
import FormatterView from "src/Components/UI/Formatter/FormatterView";
import styles from "./MsisdnCard.module.scss";

function MsisdnCard_Balance() {
  const { mainscreen } = useAppSelector((state) => state.mainscreen);
  const balance = mainscreen?.balance;

  return (
    <div>
      <div
        style={{
          fontSize: "10px",
          lineHeight: "12px",
          color: "#898989",
        }}
      >
        <div style={{ display: "flex" }}>
          Обновлен&nbsp;
          <div style={{ display: "flex" }}>
            {mainscreen && mainscreen.updated_at
              ? new Date(mainscreen.updated_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")
              : ""}
          </div>
          &nbsp;
          <div>
            {mainscreen && mainscreen.updated_at === null
              ? null
              : mainscreen &&
                mainscreen.updated_at &&
                new Date(mainscreen.updated_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </div>
        </div>
      </div>
      {balance && (
        <div className={styles.balances__wrapper__balance}>
          <FormatterView data={balance.balance} />
          <span style={{ fontSize: "12px", lineHeight: "14px" }}>сум</span>
        </div>
      )}
    </div>
  );
}

export default MsisdnCard_Balance;
