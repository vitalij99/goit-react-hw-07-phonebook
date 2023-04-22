import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';
import {
  createContactThunk,
  deleteContactThunk,
  getContactThunk,
} from './thunk';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrThunks = [createContactThunk, deleteContactThunk, getContactThunk];

const fn = type => arrThunks.map(el => el[type]);

const handlePending = ({ contacts }) => {
  contacts.isLoading = true;
};
const handleFulfilledGet = ({ contacts }, { payload }) => {
  contacts.items = payload;
};
const handleFulfilledDel = ({ contacts }, { payload }) => {
  contacts.items = contacts.items.filter(el => el.id !== payload.id);
};
const handleFulfilledCreate = ({ contacts }, { payload }) => {
  contacts.items.push(payload);
};
const handleRejected = ({ contacts }, { payload }) => {
  contacts.isLoading = false;
  contacts.error = payload;
};
const handleFulfilled = ({ contacts }) => {
  contacts.isLoading = false;
  contacts.error = '';
};
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    createFilter: (state, action) => {
      state.FiltersList = action.payload;
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(getContactThunk.fulfilled, handleFulfilledGet)
      .addCase(createContactThunk.fulfilled, handleFulfilledCreate)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDel)
      .addMatcher(isAnyOf(...fn(PENDING)), handlePending)
      .addMatcher(isAnyOf(...fn(REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...fn(FULFILLED)), handleFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { createFilter } = contactsSlice.actions;
