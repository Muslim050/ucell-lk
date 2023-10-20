import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './ModalUI.module.scss';

interface ModalUIProps {
  children: ReactNode;
}

export const ModalUI = ({ children }: ModalUIProps) => {
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 100,
        stiffness: 700
      }
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 1,
        type: 'spring',
        damping: 100,
        stiffness: 700
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 100,
        stiffness: 700
      }
    }
  };
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
