import { Report } from 'notiflix/build/notiflix-report-aio';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from '@reduxjs/toolkit';
import {
  createContactThunk,
  deleteContactThunk,
  getContactThunk,
} from 'redux/contacts/thunk';
import { createFilter } from 'redux/contacts/contactsReducer';
import { useEffect } from 'react';

export const App = () => {
  const { items: contacts } = useSelector(state => state.contacts.contacts);
  const { FiltersList } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactThunk());
  }, [dispatch]);

  const addContact = event => {
    event.preventDefault();
    const { name, phone } = event.target.elements;
    if (contacts.find(contact => contact.name === name.value)) {
      Report.warning(
        'Phonebook Warning',
        'The contact already exists with this name',
        'Okay'
      );
      return;
    }
    const contact = {
      name: name.value,
      phone: phone.value,
      id: nanoid(),
    };
    dispatch(createContactThunk(contact));
    event.target.reset();
  };
  const deleteContact = id => {
    dispatch(deleteContactThunk(id));

    if (contacts.length === 1) {
      Report.info('Phonebook Info', 'Contact book is empty!', 'Okay');
    }
  };
  const inputFilter = event => {
    dispatch(createFilter(event.target.value));
  };

  const visibleContact = () => {
    const normalizeFilter = FiltersList.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts && contacts.length > 1 && (
          <Filter value={FiltersList} onChange={inputFilter} />
        )}
        {contacts && contacts.length > 0 && (
          <ContactList
            contacts={visibleContact()}
            deleteContact={deleteContact}
          />
        )}
      </Section>
    </>
  );
};
