import React from "react";
import { links } from "../constants";

const NavigationDots = ({ active }) => {
  return (
    <div className="app__navigation">
      {links.navbar_links.map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: "#313BAC" } : {}}
          title={item.charAt(0).toUpperCase() + item.slice(1)}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
