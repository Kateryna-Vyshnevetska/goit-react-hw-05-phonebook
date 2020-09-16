import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import { v4 as uuidv4 } from "uuid";
import Filter from "./filter/Filter";

export default function App() {
  const [state, setState] = useState({
    contacts: [],
    filteredItems: [],
  });
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("contacts");
    const contacts = JSON.parse(dataFromStorage);
    if (contacts) {
      setState((prev) => ({ ...prev, contacts: [...contacts] }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state.contacts));
  }, [state.contacts]);

  useEffect(() => {
    if (filterVal) {
      const filt = state.contacts.filter((el) =>
        el.name.toLowerCase().includes(filterVal.toLowerCase())
      );
      if (filt.length > 0) {
        setState((prev) => ({
          ...prev,
          filteredItems: [...filt],
        }));
      } else {
        setState((prev) => ({ ...prev, filteredItems: [] }));
      }
    } else {
      setState((prev) => ({ ...prev, filteredItems: [] }));
    }
  }, [filterVal]);

  const getContacts = (newContact) => {
    newContact["id"] = uuidv4();
    setState((prev) => ({
      ...prev,
      contacts: [newContact, ...prev.contacts],
    }));
  };

  const deleteContact = (id) => {
    const newContacts = state.contacts.filter((elem) => {
      return elem.id !== id;
    });
    const newFilter = state.filteredItems.filter((elem) => {
      return elem.id !== id;
    });
    setState((prev) => ({
      ...prev,
      contacts: [...newContacts],
      filteredItems: [...newFilter],
    }));
  };

  const getNamesByFilter = (value) => {
    setFilterVal(value);
  };

  return (
    <>
      <div className="section">
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="title-anim"
          unmountOnExit
        >
          <h1 className="title">Phonebook</h1>
        </CSSTransition>
        <ContactForm {...state} getContacts={getContacts} />
        <h2 className="title">Contacts</h2>
        <Filter getNamesByFilter={getNamesByFilter} />
        <ContactList
          filteredItems={
            state.filteredItems.length > 0 || filterVal
              ? state.filteredItems
              : state.contacts
          }
          getIdForDelete={deleteContact}
        />
      </div>
    </>
  );
}
