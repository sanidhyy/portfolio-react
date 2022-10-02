import React, { useState } from "react";

import { images, links } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

// Footer
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  // handle input change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Check if string is empty or contains whitespaces
  const isEmptyOrSpaces = (str) => {
    return /^\s*$/.test(str);
  };

  // email validation
  const isInvalidEmail = (email) => {
    const regex = new RegExp( // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    return !email || regex.test(email) === false;
  };

  // handle submit
  const handleSubmit = () => {
    const name_in = document.getElementById("name");
    const email_in = document.getElementById("email");
    const message_in = document.getElementById("message");

    // validate name
    if (isEmptyOrSpaces(name) || name.length < 3) {
      name_in.style.border = "1px solid #ff8989";
      return;
    } else {
      name_in.style.border = "none";
    }

    // validate email
    if (isInvalidEmail(email)) {
      email_in.style.border = "1px solid #ff8989";
      return;
    } else {
      email_in.style.border = "none";
    }

    // validate messsage
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

    // submit form to sanity
    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      {/* Head */}
      <h2 className="head-text">Take a coffee &amp; chat with me.</h2>

      {/* Email */}
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="Email" />
          <a href={`mailto:${links.contact_links.email}`} className="p-text">
            {links.contact_links.email}
          </a>
        </div>

        {/* Phone */}
        <div className="app__footer-card">
          <img src={images.mobile} alt="Mobile" />
          <a href={`tel:${links.contact_links.email}`} className="p-text">
            {links.contact_links.phone}
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          {/* Name */}
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
          {/* Email */}
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
          {/* Your Messages */}
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
          {/* Send Message */}
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      ) : (
        // Thank You Message
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
