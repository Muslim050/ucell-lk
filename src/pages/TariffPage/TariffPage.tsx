import { fetchRate } from "src/core/store/rate/rate.thunks";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import CardRate from "src/Components/TariffPlan/CardRate/CardRate";
import ModalRateСonfirmation from "src/Components/UI/ModalUI/ModalRateСonfirmation/ModalRateСonfirmation";
import React from "react";
import styles from "./TariffPage.module.scss";
import { PopupModalWrapper } from "src/Components/UI/ModalUI/SuccessPopupModal/PopupModalWrapper";
import MyRateCard from "src/Components/TariffPlan/MyRateCard/MyRateCard";
import { Loader } from "src/Components/UI/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ModalRateConfirmTariffPage from "src/Components/UI/ModalUI/ModalRateConfirmTariffPage/ModalRateConfirmTariffPage";
import MyMsisdnCard from "src/Components/Services/MyMsisdnCard/MyMsisdnCard";

function ChangeTariffPage() {
  const dispatch = useAppDispatch();
  const rate = useAppSelector(({ rate }) => rate.rate);
  const rateplans = useAppSelector(({ rate }) => rate.rate);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    dispatch(fetchRate()).then(() => setLoading(false));
  }, [dispatch]);
  return (
    <div>
      <ModalRateСonfirmation />
      <ModalRateConfirmTariffPage />
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
        <div>
          <div>
            <div className={styles.wrapper__msisdn_rate}>
              <div className={styles.wrapper__msisd}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Ваш баланс
                </div>
                <MyMsisdnCard />
              </div>

              <div className={styles.wrapper__rate}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Мой тариф
                </div>
                <MyRateCard />
              </div>
            </div>
          </div>

          <div
            style={{
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "24px",
            }}
          >
            Доступные тарифы
          </div>

          <div className={styles.cardWrapper}>
            <div
              style={{
                maxWidth: "1325px",
                margin: "0px auto",
              }}
            >
              <Swiper
                spaceBetween={16}
                slidesPerView={"auto"}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {rate &&
                  rate.map((r, index) => (
                    <SwiperSlide key={index}>
                      <CardRate key={index} rate={r} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeTariffPage;
