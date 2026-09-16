import { links } from "../constants";

const NavigationDots = ({ active }: { active: string }) => {
  return (
    <div className="app__navigation">
      {links.navbar_links.map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          aria-label={item}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: "#313BAC" } : {}}
          title={item.charAt(0).toUpperCase() + item.slice(1)}
        >
          {" "}
        </a>
      ))}
    </div>
  );
};

export default NavigationDots;
