import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./SuccessPopupModal.module.scss";
import { useDispatch } from "react-redux";
import { hidePopUpModal } from "src/core/store/modal/modal.slice";
import { ReactComponent as Close } from "../../../../assets/Close.svg";
import { useAppSelector } from "src/core/utils/hooks/redux";

interface ModalUIProps {
  children: ReactNode;
}

export const PopupModalUI = ({ children }: ModalUIProps) => {
  const dispatch = useDispatch();
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(hidePopUpModal());
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal_content}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
