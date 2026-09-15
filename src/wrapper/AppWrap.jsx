import React from "react";
import { NavigationDots, SocialMedia } from "../components";

// App Wrap (Higher Order Component)
const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        {/* Social Media */}
        <SocialMedia />

        <div className="app__wrapper app__flex">
          {/* Main Component */}
          <Component />

          {/* Copyright */}
          <div className="copyright">
            <p className="p-text">
              &copy; {new Date().getFullYear()} <span>MICAEL</span>
            </p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        {/* Navigation Dots */}
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
