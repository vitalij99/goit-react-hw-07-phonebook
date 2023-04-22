import { createAsyncThunk } from '@reduxjs/toolkit';
import { createContact, deleteContact, getContact } from 'redux/api/api';

export const getContactThunk = createAsyncThunk('contacts/fetchAll', () => {
  return getContact();
});
export const createContactThunk = createAsyncThunk(
  'contacts/addContact',
  id => {
    return createContact(id);
  }
);
export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  id => {
    return deleteContact(id);
  }
);
