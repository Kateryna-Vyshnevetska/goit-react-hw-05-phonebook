import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactItem from "./contactItem/ContactItem";
import "./ContactList.css";

const ContactList = ({ filteredItems, getIdForDelete }) => {
  console.log(filteredItems);
  const delItem = (id) => {
    getIdForDelete(id);
  };

  return (
    <>
      <TransitionGroup component="ul" className="ContactList">
        {filteredItems.map(({ name, number, id }) => (
          <CSSTransition key={id} timeout={250} classNames="ContactItem">
            <ContactItem
              id={id}
              name={name}
              number={number}
              delItem={delItem}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
export default ContactList;
