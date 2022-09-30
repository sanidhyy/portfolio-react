import React, { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { images, links } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState(links.navbar_links[0]);

  const setLink = () => {
    const currentLink = window.location.hash;
    if (currentLink.length > 0) {
      setActiveLink(currentLink.substring(1));
    }
  };

  useEffect(() => {
    setLink();
  }, []);

  window.addEventListener("hashchange", setLink);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href={`#${links.navbar_links[0]}`}>
          <img src={images.logo} alt="Micael" />
        </a>
      </div>
      <ul className="app__navbar-links">
        {links.navbar_links.map((item) => (
          <li key={`link-${item}`} className="app__flex p-text">
            <div />
            <a
              href={`#${item}`}
              className={activeLink === item ? "active" : ""}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul className="app__navbar-links">
              {links.navbar_links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={activeLink === item ? "active" : ""}
                    onClick={() => setToggle(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
