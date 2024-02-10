import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};
const pending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};
const rejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: buider => {
    buider
      .addCase(fetchContacts.pending, pending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload;
      })
      .addCase(fetchContacts.rejected, rejected)
      .addCase(addContact.pending, pending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items.unshift(payload);
      })
      .addCase(addContact.rejected, rejected)
      .addCase(deleteContact.pending, pending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload
        );
      })
      .addCase(deleteContact.rejected, rejected);
  },
});

export const contactReducer = contactSlice.reducer;

export const { setFilter } = contactSlice.actions;
