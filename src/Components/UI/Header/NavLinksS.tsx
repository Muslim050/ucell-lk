import React, { useState } from "react";
import { Seclinks } from "./MyLinks";
import style from "./NavLinks.module.scss";

function NavLinksS() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {Seclinks.map((link, index) => (
        <div key={index}>
          <div className={style.navLinks}>
            <h1
              className={style.navLinks__links}
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
}

export default NavLinksS;
