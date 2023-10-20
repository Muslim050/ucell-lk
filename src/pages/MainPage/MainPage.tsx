import React from "react";
import styles from "./MainPage.module.scss";
import { fetchFIO, fetchInfo } from "src/core/store/info/info.thunks";
import { useAppDispatch, useAppSelector } from "src/core/utils/hooks/redux";
import MsisdnCard from "src/Components/Main/MsisdnCard/MsisdnCard";
import TariffPlanCard from "src/Components/Main/TariffPlanCard/TariffPlanCard";
import ButtonsCard from "src/Components/Main/ButtonsCard/ButtonsCard";
import ActiveServicesCard from "src/Components/Main/ActiveServices/ActiveServicesCard";
import ExpensesBanner from "src/Components/Main/ExpensesBanner/ExpensesBanner";
import SharesBanner from "src/Components/Main/SharesBanner/SharesBanner";
import { ModalDetailing } from "src/Components/UI/ModalUI/ModalDetailing/ModalDetailing";
import BannerAppCard from "src/Components/Main/BannerAppCard/BannerAppCard";
import DopButtonsCard from "src/Components/Main/ButtonsCard/DopButtonsCard";
import { Loader } from "src/Components/UI/Loader/Loader";
import ModalInfoRate from "src/Components/UI/ModalUI/ModalInfoRate/ModalInfoRate";
import { PopupModalWrapper } from "src/Components/UI/ModalUI/SuccessPopupModal/PopupModalWrapper";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { mainscreen } = useAppSelector((state) => state.mainscreen);

  const [loading, setLoading] = React.useState(true);
  const tariff = mainscreen?.tariff;
  const image = mainscreen?.carousel;
  const expenses = mainscreen?.expenses;

  React.useEffect(() => {
    dispatch(fetchInfo()).then(() => setLoading(false));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchFIO());
  }, [dispatch]);

  return (
    <div>
      <PopupModalWrapper />
      {loading ? (
        <Loader wrapperHeight="80vh" />
      ) : (
        <>
          <div style={{ padding: "20px 0px" }}>
            <div className={styles.info_wrapper}>
              <MsisdnCard />
              <TariffPlanCard tariff={tariff} />
              <ButtonsCard />
              <BannerAppCard />
              <ModalInfoRate />
              <ModalDetailing />
            </div>
            <DopButtonsCard />
          </div>

          <div>
            <ActiveServicesCard />
          </div>
          <div className={styles.wrappersBanners}>
            <div className={styles.ExpensesBanner}>
              <ExpensesBanner expenses={expenses} />
            </div>
            <div className={styles.SharesBanner}>
              <SharesBanner image={image} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
