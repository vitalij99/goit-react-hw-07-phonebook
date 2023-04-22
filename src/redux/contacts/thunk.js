import { createAsyncThunk } from '@reduxjs/toolkit';
import { createContact, deleteContact, getContact } from 'redux/api/api';

export const getContactThunk = createAsyncThunk('contacts/get', () => {
  return getContact();
});
export const createContactThunk = createAsyncThunk('contacts/create', id => {
  return createContact(id);
});
export const deleteContactThunk = createAsyncThunk('contacts/delete', id => {
  return deleteContact(id);
});
