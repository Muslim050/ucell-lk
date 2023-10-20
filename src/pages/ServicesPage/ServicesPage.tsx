import { fetchFIO, fetchInfo } from "src/core/store/info/info.thunks";
import { fetchServices } from "src/core/store/services/services.thunks";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import ServicesCardInfo from "src/Components/Services/ServicesCardInfo";
import React from "react";
import styles from "./ServicesPage.module.scss";
import { ModalServicesConfirmed } from "src/Components/UI/ModalUI/ModalServicesConfirmed/ModalServicesConfirmed";
import { Loader } from "src/Components/UI/Loader/Loader";
import ConnectedServices from "src/Components/Services/ConnectedServices/ConnectedServices";
import { ModalServicesDisabled } from "src/Components/UI/ModalUI/ModalServicesDisabled/ModalServicesDisabled";
import { PopupModalWrapper } from "src/Components/UI/ModalUI/SuccessPopupModal/PopupModalWrapper";
import MyMsisdnCard from "src/Components/Services/MyMsisdnCard/MyMsisdnCard";
function ChangeServicesPage() {
  const dispatch = useAppDispatch();
  const [services] = useAppSelector(({ services }) => [services.services]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"all" | "enabled">("all");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    dispatch(fetchServices()).then(() => setLoading(false));
    dispatch(fetchInfo());
    dispatch(fetchFIO());
  }, [dispatch]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    setActiveCategory(tab === "all" ? null : tab);
  };

  return (
    <>
      <ModalServicesConfirmed />
      <ModalServicesDisabled />
      <PopupModalWrapper />

      {loading ? (
        <div
          style={{
            height: "100vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <div className={styles.wrapper__msisdn_connectionS}>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                  Ваш баланс
                  <MyMsisdnCard />
                  {/* <MsisdnCard /> */}
                </div>
              </div>
              <div onClick={() => handleTabClick("enabled")}>
                <ConnectedServices />
              </div>
            </div>

            <div
              style={{
                fontWeight: "600",
                fontSize: "20px",
                lineHeight: "24px",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              {activeTab === "enabled"
                ? "Подключенные услуги"
                : "Доступные услуги"}
            </div>
            <div className={styles.tab}>
              <ul className={styles.inline}>
                <button
                  className={
                    activeTab === "all"
                      ? styles.inline_active__selected
                      : styles.inline_active
                  }
                  onClick={() => handleTabClick("all")}
                >
                  Все услуги
                </button>
                {/* <button
                  className={
                    activeTab === 'enabled'
                      ? styles.inline_active__selected
                      : styles.inline_active
                  }
                  onClick={() => handleTabClick('enabled')}
                >
                  Подключенные услуги
                </button> */}
              </ul>
            </div>

            <div style={{ display: "flex", overflow: "auto" }}>
              {activeTab === "all" &&
                services?.all?.map((category: any, categoryIndex: number) => (
                  <div key={categoryIndex}>
                    <div className={styles.tab}>
                      <ul className={styles.inline}>
                        <button
                          className={
                            activeCategory === category.name
                              ? styles.inline_active__selected
                              : styles.inline_active
                          }
                          onClick={() => setActiveCategory(category.name)}
                        >
                          {category.name}
                        </button>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.servicesInfo}>
              {activeCategory !== null
                ? services?.all?.map(
                    (category: any, categoryIndex: number) =>
                      category.name === activeCategory &&
                      category.items?.map((item: any, itemIndex: number) => (
                        <ServicesCardInfo key={itemIndex} item={item} />
                      ))
                  )
                : services &&
                  services?.all?.map((category: any, categoryIndex: number) =>
                    category.items?.map((item: any, itemIndex: number) => (
                      <ServicesCardInfo key={itemIndex} item={item} />
                    ))
                  )}

              {activeCategory === "enabled" &&
                services?.enabled?.map((category: any, categoryIndex: number) =>
                  category.items?.map((item: any, itemIndex: number) => (
                    <ServicesCardInfo key={itemIndex} item={item} />
                  ))
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChangeServicesPage;
