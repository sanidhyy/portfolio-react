import React, { useState } from "react";

import { images, links } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Check if string is empty or contains whitespaces
  const isEmptyOrSpaces = (str) => {
    return /^\s*$/.test(str);
  };

  const checkEmail = (str) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      str
    );
  };

  const handleSubmit = () => {
    const name_in = document.getElementById("name");
    const email_in = document.getElementById("email");
    const message_in = document.getElementById("message");

    if (isEmptyOrSpaces(name) || name.length < 3) {
      name_in.style.border = "1px solid #ff8989";
      return;
    } else {
      name_in.style.border = "none";
    }

    if (!checkEmail(email)) {
      email_in.style.border = "1px solid #ff8989";
      return;
    } else {
      email_in.style.border = "none";
    }

    if (isEmptyOrSpaces(message) || message.length < 3) {
      message_in.style.border = "1px solid #ff8989";
      return;
    } else {
      message_in.style.border = "none";
    }

    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee &amp; chat with me.</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="Email" />
          <a href={`mailto:${links.contact_links.email}`} className="p-text">
            {links.contact_links.email}
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="Mobile" />
          <a href={`tel:${links.contact_links.email}`} className="p-text">
            {links.contact_links.phone}
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Name"
              id="name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="Your E-mail"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message..."
              value={message}
              name="message"
              id="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      ) : (
        <div className="app__footer-thankyou app__flex">
          <p className="bold-text">Thank You for getting in touch.</p>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
