import { useDispatch } from "react-redux";
import { hidePopUpModal } from "src/core/store/modal/modal.slice";
import { ReactComponent as Close } from "../../../../assets/Close.svg";
import Success from "src/assets/alertModal/Success.png";
import Error from "src/assets/alertModal/Error.png";

import { useAppSelector } from "src/core/utils/hooks/redux";
import { AnimatePresence } from "framer-motion";
import { PopupModalUI } from "./PopupModalUI";

export const PopupModalWrapper = () => {
  const { popupModal, status, message } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {popupModal && (
        <>
          {status ? (
            <PopupModalUI>
              <div>
                <div className="modal_header">
                  <div className="modal_header__title"></div>
                  <button
                    className="close_icon"
                    onClick={() => dispatch(hidePopUpModal())}
                  >
                    <Close />
                  </button>
                </div>

                <div style={{ width: "300px", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                  >
                    {status === "success" ? (
                      <img src={Success} alt="" />
                    ) : (
                      <img src={Error} alt="" />
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    {status === "success"
                      ? "Ваш запрос принят"
                      : "Не удалось подключить тариф"}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#999",
                      marginBottom: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    {message}
                  </div>
                </div>
              </div>
            </PopupModalUI>
          ) : (
            ""
          )}
        </>
      )}
    </AnimatePresence>
  );
};
