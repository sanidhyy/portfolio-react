import React, { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { images, links } from "../../constants";
import "./Navbar.scss";

// Navbar
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState(links.navbar_links[0]);

  // set active link
  const setLink = () => {
    const currentLink = window.location.hash;
    if (currentLink.length > 0) {
      setActiveLink(currentLink.substring(1));
    }
  };

  useEffect(setLink, []);

  // listen hash change
  window.addEventListener("hashchange", setLink);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        {/* Logo */}
        <a href={`#${links.navbar_links[0]}`} title="Micael">
          <img src={images.logo} alt="Micael" />
        </a>
      </div>
      <ul className="app__navbar-links">
        {/* Navbar links */}
        {links.navbar_links.map((item) => (
          <li key={`link-${item}`} className="app__flex p-text">
            <div />
            <a
              href={`#${item}`}
              className={activeLink === item ? "active" : ""}
              title={item.charAt(0).toUpperCase() + item.slice(1)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      {/* Source Code */}
      <button
        type="button"
        className="app__navbar-btn"
        title="View Source Code on Github"
        onClick={() => window.open(links.source_code, "_blank", "noopener")}
      >
        Source Code
      </button>

      <div className="app__navbar-menu">
        {/* Toggle Menu */}
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {/* Navbar Menu [MOBILE] */}
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
                    title={item.charAt(0).toUpperCase() + item.slice(1)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              {/* Source Code [MOBILE] */}
              <li key="source-code">
                <a
                  href={links.source_code}
                  target="_blank"
                  rel="noreferrer noopener"
                  title="View Source Code on Github"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
