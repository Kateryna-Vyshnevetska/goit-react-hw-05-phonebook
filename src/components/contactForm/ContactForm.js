import React, { useState } from "react";
import {CSSTransition } from "react-transition-group";
import { NotificationError } from "../notificationError/NotificationError";
import "./ContactForm.css";

const ContactForm = ({ contacts, getContacts }) => {
  const newContact = {};
  const [flag, setFlag] = useState(false);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    form.reset();
    let flag = true;
    if (newContact.name === undefined || newContact.number === undefined) {
      setFlag(true);
    } else {
      contacts.map((el) => (el.name === newContact.name ? (flag = false) : ""));
      flag ? getContacts(newContact) : setFlag(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    newContact[name] = value;
  };

  return (
    <>
      <CSSTransition in={flag} classNames="noti" timeout={750} onEntered={() => setFlag(false)} unmountOnExit>
        <NotificationError content="You have not completed all the fields or the values ​​are repeated" />
      </CSSTransition>

      <form onSubmit={handleSubmit}>
        <label className="text">
          Name
          <input
            className="input"
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={handleChange}
          />
        </label>
        <label className="text">
          Number
          <input
            className="input"
            type="text"
            placeholder="Enter number"
            name="number"
            onChange={handleChange}
          />
        </label>
        <button className="btn" type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
