import { Report } from 'notiflix/build/notiflix-report-aio';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContact,
  createFilter,
  deleteContactList,
} from 'redux/contacts/contactsReducer';
import { nanoid } from '@reduxjs/toolkit';

export const App = () => {
  const { contacts, FiltersList } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const addContact = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
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
      number: number.value,
      id: nanoid(),
    };
    dispatch(createContact(contact));
    event.target.reset();
  };
  const deleteContact = id => {
    dispatch(deleteContactList(id));

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
        {contacts.length > 1 && (
          <Filter value={FiltersList} onChange={inputFilter} />
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContact()}
            deleteContact={deleteContact}
          />
        )}
      </Section>
    </>
  );
};
