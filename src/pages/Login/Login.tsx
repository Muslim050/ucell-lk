import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthTypes } from "src/core/models/auth.interface";
import Logo from "src/assets/LoginPage/Logo.png";
import Location from "src/assets/LoginPage/Location.png";
import Check from "src/assets/LoginPage/Check.png";
import Alarm from "src/assets/LoginPage/Alarm.png";
import Setting from "src/assets/LoginPage/Setting.png";
import styles from "./Login.module.scss";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import axios from "axios";

function Login() {
  const { t } = useTranslation("translation");

  const [msisdn, setMsisdn] = React.useState<AuthTypes["msisdn"]>("");
  const [code, setCode] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("ussd");
  const navigate = useNavigate();

  const [otpRequested, setOtpRequested] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleMsisdn = async () => {
    try {
      await axios.post(
        "https://api-ma.ucell.uz/api/v1.5/auth/otp/request",
        {
          msisdn,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
            "Accept-Language": "ru",
          },
        }
      );

      setOtpRequested(true);
    } catch (error) {
      setError("Введите номер правильно"); // Set the error message
    }
  };
  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
  };
  const handleOTP = async () => {
    try {
      const { data } = await axios.post(
        "https://api-ma.ucell.uz/api/v1.5/auth/otp/verify",
        { msisdn, code },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
          },
        }
      );
      // Handle the response data accordingly
      console.log("OTP Verification Response:", data);
      localStorage.setItem("token", data.token);

      navigate("/main");
    } catch (error) {
      console.log(error);
      setError("Введите номер правильно"); // Set the error message
    }
  };

  return (
    <>
      {" "}
      <div className={styles.login}>
        <div className={styles.login__wrapper}>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
            <div className={styles.logo__text}>{t("login")}</div>
          </div>

          <div className={styles.tab}>
            <div
              className={`${styles.tab__text} ${
                selectedTab === "ussd" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("ussd")}
            >
              По SMS-паролю
            </div>
            <div
              className={`${styles.tab__text} ${
                selectedTab === "password" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("password")}
            >
              По паролю
            </div>
          </div>

          <div>
            {selectedTab === "ussd" ? (
              <div>
                <div className={styles.input_wrapper}>
                  <label className={styles.input_wrapper__label}>
                    Номер телефона
                  </label>

                  <input
                    type="number"
                    placeholder="Номер"
                    autoComplete="off"
                    className={styles.input_wrapper__input}
                    onChange={(e) => setMsisdn(e.target.value)}
                  />
                </div>

                {error ? (
                  <div>{error}</div>
                ) : (
                  <div className={styles.ussd_text}>
                    <p>Пожалуйста, введите ваш номер телефона</p>
                    <div className={styles.ussd_text__subtext}>
                      для получения пароля по SMS, и затем введите его в это
                      поле.
                    </div>
                  </div>
                )}

                <div className={styles.otpInputWrapper}>
                  <OtpInput
                    value={code}
                    onChange={setCode}
                    numInputs={4}
                    renderSeparator={
                      <span
                        style={{ margin: "0 2px", color: "#E2E2E2" }}
                      ></span>
                    }
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      border: "1px solid #E2E2E2",
                      width: "40px",
                      height: "44px",
                      fontSize: "18px",
                      color: "#652D86",
                      fontWeight: "400",
                      caretColor: "#652D86",
                      lineHeight: "24px",
                      borderRadius: "12px",
                    }}
                  />
                </div>
                {otpRequested ? (
                  <button
                    className={styles.cardInfo__count__btn}
                    onClick={handleOTP} // Обработчик для кнопки "Продолжить"
                  >
                    Продолжить
                  </button>
                ) : (
                  <button
                    className={styles.cardInfo__count__btn}
                    onClick={handleMsisdn}
                  >
                    Получить OTP код
                  </button>
                )}

                <div className={styles.login_links}>
                  <a href="/" className={styles.login_link}>
                    Вернуться на сайт
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.input_wrapper}>
                  <label className={styles.input_wrapper__label}>
                    Номер телефона
                  </label>
                  <input
                    type="number"
                    placeholder="Номер"
                    autoComplete="off"
                    className={styles.input_wrapper__input}
                    onChange={(e) => setMsisdn(e.target.value)}
                  />
                </div>

                <div className={styles.input_wrapper}>
                  <label className={styles.input_wrapper__label}>
                    Введите пароль{" "}
                  </label>
                  <input
                    type="password"
                    placeholder="Пароль"
                    autoComplete="off"
                    className={styles.input_wrapper__input}
                    onChange={(e) => setMsisdn(e.target.value)}
                  />
                </div>

                <div className={styles.login_links}>
                  <a href="/" className={styles.login_link}>
                    Забыли постоянный пароль?
                  </a>
                  <a href="/" className={styles.login_link}>
                    Зарегистрировать постоянный пароль
                  </a>
                </div>

                <button
                  className={styles.cardInfo__count__btn}
                  onClick={handleMsisdn}
                >
                  Продолжить
                </button>

                <div className={styles.login_links}>
                  <a href="/" className={styles.login_link}>
                    Вернуться на сайт
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <img src={Location} alt="" className={styles.location} />
        <img src={Check} alt="" className={styles.check} />
        <img src={Alarm} alt="" className={styles.alarm} />
        <img src={Setting} alt="" className={styles.setting} />
      </div>
    </>
  );
}

export default Login;
