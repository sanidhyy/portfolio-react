import React from "react";

import { links } from "../constants";

// Social Media
const SocialMedia = () => {
  return (
    <div className="app__social">
      {/* Icons */}
      {links.social_links.map((link) => (
        <div
          key={link.name}
          title={link.name}
          onClick={() => window.open(link.url, "_blank", "noopener")}
        >
          {link.icon}
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
