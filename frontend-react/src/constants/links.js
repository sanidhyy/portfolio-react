import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

const navbar_links = [
  "home",
  "about",
  "work",
  "skills",
  "testimonial",
  "contact",
];

const contact_links = {
  email: "contactme@micael.com",
  phone: "+1 (123) 456-789",
};

const social_links = [
  {
    name: "Twitter",
    icon: <BsTwitter />,
    url: "http://twitter.com",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "http://facebook.com",
  },
  {
    name: "Github",
    icon: <AiFillGithub />,
    url: "http://github.com",
  },
];

const source_code = "http://github.com";

const links = {
  navbar_links,
  contact_links,
  social_links,
  source_code,
};

export default links;
