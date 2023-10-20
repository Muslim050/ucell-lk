import React from "react";
import styles from "./DropdownUI.module.scss";
import { ReactComponent as Dropdown } from "src/assets//PersonalArea/Dropdown.svg";

interface DropdownUIProps {
  price?: Array<
    | { header: { text_left: string } }
    | { items: Array<{ text_left: string; text_right: string }> }
  > | null;
}

const DropdownUI: React.FC<DropdownUIProps> = ({ price }) => {
  const [open, setOpen] = React.useState(false);

  const menuRef = React.useRef<HTMLUListElement>(null);

  const handleOpen: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };

  const getMenuHeight = (): string => {
    return open && menuRef.current ? `${menuRef.current.scrollHeight}px` : "0";
  };

  const headerItem =
    price &&
    (price.find((item) => "header" in item) as {
      header?: { text_left: string };
    });
  const headerText = headerItem?.header?.text_left;
  return (
    <div className={styles.dropdown}>
      <div className={styles.trigger} onClick={handleOpen}>
        <>{headerText}</>
        <button className={styles.btn}>
          <Dropdown className={open ? styles.iconOpen : styles.icon} />
        </button>
      </div>
      <ul
        ref={menuRef}
        className={`${styles.menu} ${open ? styles.open : ""}`}
        style={{ maxHeight: getMenuHeight() }}
      >
        {price &&
          price.map((item, index) => {
            if ("items" in item) {
              return (
                <li
                  key={index}
                  style={{
                    paddingBottom: "15px",
                  }}
                >
                  {item.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: "1px solid #EDEDED",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "15px",
                          lineHeight: "24px",
                        }}
                      >
                        {item.text_left}
                      </div>
                      <div
                        key={itemIndex}
                        style={{
                          fontWeight: "400",
                          fontSize: "15px",
                          lineHeight: "24px",
                          padding: "5px 10px",
                          borderRadius: "8px",
                          background: "#F5F7FA",
                        }}
                      >
                        {item.text_right}
                      </div>
                    </div>
                  ))}
                </li>
              );
            } else {
              return null; // Handle header items or other cases
            }
          })}
      </ul>
    </div>
  );
};

export default DropdownUI;
