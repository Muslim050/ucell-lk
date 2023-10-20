import React from "react";
import styles from "./ActiveServicesCard.module.scss";
import ProgressServices from "./ProgressServices";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import { fetchInfo } from "src/core/store/info/info.thunks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ActiveServicesCard = () => {
  const dispatch = useAppDispatch();
  const { mainscreen } = useAppSelector((state) => state.mainscreen);
  const services = mainscreen?.services;
  React.useEffect(() => {
    dispatch(fetchInfo());
  }, [dispatch]);
  return (
    <>
      {services === undefined ? (
        ""
      ) : (
        <div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "24px",
              marginBottom: "-10px",
            }}
          >
            Подключенные услуги
          </div>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <>
              {services &&
                services.map((service: any, index: string) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      marginBottom: "100px",
                      maxWidth: "1325px",
                      margin: "0 auto",
                      padding: "20px 10px 10px 0px",
                    }}
                  >
                    <SwiperSlide>
                      <>
                        <div className={styles.services}>
                          <div className={styles.servicesWrapper}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <div className={styles.subscriptionFee}>
                                <div className={styles.packName}>
                                  <div
                                    style={{
                                      wordWrap: "break-word",
                                      wordBreak: "break-all",
                                      minWidth: "180px",
                                    }}
                                  >
                                    {service && service.name}
                                  </div>
                                  <div className={styles.packName__subtitle}>
                                    {service && service.renewal_price}
                                  </div>
                                </div>

                                {service &&
                                service.renewal_information === "" ? null : (
                                  <div
                                    className={styles.subscriptionFee__title}
                                  >
                                    <div
                                      className={
                                        styles.subscriptionFee__subtitle
                                      }
                                    >
                                      {service && service.renewal_information}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className={styles.progress}>
                                <div style={{ display: "flex" }}>
                                  <div className={styles.booorder}></div>
                                  <div
                                    style={{
                                      height: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    {service && (
                                      <ProgressServices service={service} />
                                    )}

                                    <div
                                      className={styles.limits__limit__wrapper}
                                    >
                                      <span className={styles.limits__initial}>
                                        {service && service.value.live}

                                        {/* {service && service.initial_amount.value} */}
                                      </span>
                                      /
                                      <span className={styles.limits__live}>
                                        {service && service.value.initial}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </SwiperSlide>
                  </div>
                ))}
            </>
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ActiveServicesCard;
