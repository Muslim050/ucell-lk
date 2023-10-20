import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import NavLinks from "./NavLinks";
import NavLinksS from "./NavLinksS";
import { ReactComponent as Menu } from "src/assets/Header/Menu.svg";
import { ReactComponent as Close } from "src/assets/Header/Close.svg";
import AutoExit from "../AutoExit/AutoExit";
import { ReactComponent as BackArrow } from "src/assets/PersonalArea/BackArrow.svg";
import style from "./Header.module.scss";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className={style.navbar}>
      <div className={style.navbar__wrapper}>
        <div className={style.navbar__Dopwrapper}>
          <div className={style.navbar__logo}>
            <a href="">
              <Logo style={{ width: "52px" }} />
            </a>
            <div className={style.navbar__burger}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {pathname === "/change-services" ||
                  pathname === "/change-rate" ? (
                    <>
                      <Link to={"/main"}>
                        <div className={style.btn__wrapper}>
                          <button
                            className={style.btn__wrapper__btn}
                            onClick={() => {
                              console.log("da");
                            }}
                          >
                            <BackArrow style={{ marginRight: "4px" }} />
                            Назад в кабинет
                          </button>
                        </div>
                      </Link>
                    </>
                  ) : null}
                  <AutoExit />
                </div>

                <div
                  onClick={() => setOpen(!open)}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    marginLeft: "15px",
                  }}
                >
                  {open ? (
                    <Close style={{ width: "25px", height: "25px" }} />
                  ) : (
                    <Menu style={{ width: "25px", height: "25px" }} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <ul className={style.navbar__ul}>
            <NavLinksS />
          </ul>
        </div>

        <div
          className={
            style.navbar__Dopwrapper + " " + style.navbar__Dopwrapper__second
          }
        >
          <div className={style.navbar__Dopwrapper_wrapper}>
            <ul className={style.navbar__ul}>
              <NavLinks />
            </ul>

            <div className={style.navbar__dopBtn}>
              {pathname === "/change-services" ||
              pathname === "/change-rate" ? (
                <>
                  <Link to={"/main"}>
                    <div className={style.btn__wrapper}>
                      <button
                        className={style.btn__wrapper__btn}
                        onClick={() => {
                          console.log("da");
                        }}
                      >
                        <BackArrow style={{ marginRight: "4px" }} />
                        Назад в кабинет
                      </button>
                    </div>
                  </Link>
                </>
              ) : null}
              <AutoExit />
            </div>
          </div>
        </div>

        <ul
          className={`${style.navbar__ulresp} ${
            open
              ? `${style.navbar__ulresp__ulrespl}`
              : `${style.navbar__ulresp__ulrespL}`
          }`}
        >
          <NavLinksS />

          <NavLinks />
        </ul>
      </div>
    </nav>
  );
}

export default Header;
