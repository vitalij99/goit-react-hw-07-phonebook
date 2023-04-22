import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    createContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContactList(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    createFilter: (state, action) => {
      state.FiltersList = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { createContact, createFilter, deleteContactList } =
  contactsSlice.actions;
