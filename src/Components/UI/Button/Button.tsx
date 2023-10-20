import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
interface ButtonProps {
  color?: string;
  link?: string;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  color = '#7220A3',
  link,
  icon,
  children,
  onClick
}) => {
  const buttonStyle = {
    backgroundColor: color
  };

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <button
      className={styles.btn__wrapper__btn}
      style={buttonStyle}
      onClick={handleOnClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
