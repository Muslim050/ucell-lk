import { useDispatch } from "react-redux";
import { ReactComponent as Close } from "../../../../assets/Close.svg";
import { AnimatePresence } from "framer-motion";
import { ModalUI } from "../ModalUI";
import { hideModalPayment } from "src/core/store/modal/modal.slice";
import { useAppSelector } from "src/core/utils/hooks/redux";

export const ModalPayment = () => {
  const dispatch = useDispatch();
  const { show } = useAppSelector((state) => state.modal);

  return (
    <>
      <AnimatePresence>
        {show && (
          <ModalUI>
            <div className="modal_header">
              <div className="modal_header__title">Пополнение счета</div>
              <button
                className="close_icon"
                onClick={() => dispatch(hideModalPayment())}
              >
                <Close />
              </button>
            </div>

            <div>
              <iframe
                src="https://widget.apelsin.uz/ucell?lang=ru"
                width="320"
                height="350"
              ></iframe>
            </div>
          </ModalUI>
        )}
      </AnimatePresence>
    </>
  );
};
