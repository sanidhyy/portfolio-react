import { links } from "../constants";

const SocialMedia = () => {
  return (
    <div className="app__social">
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
