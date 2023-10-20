import { links } from './MyLinks';
import style from './NavLinks.module.scss';

function NavLinks() {
  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          <a href={link.link} className={style.navLinks}>
            <h1 className={style.navLinks__links}>{link.name}</h1>
          </a>
        </div>
      ))}
    </>
  );
}

export default NavLinks;
