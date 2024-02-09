import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
  // items: [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ],
  // filter: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetchContactsPending: state => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    fetchContactsSucces: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.items = payload;
    },
    fetchContactsError: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
    addContactPending: (state, { payload }) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    addContactSucces: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.items.unshift(payload);
    },
    addContactError: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
    deleteContactPending: state => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    deleteContactSucces: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== payload
      );
    },
    deleteContactError: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const contactReducer = contactSlice.reducer;

export const {
  setFilter,
  fetchContactsPending,
  fetchContactsSucces,
  fetchContactsError,
  addContactPending,
  addContactSucces,
  addContactError,
  deleteContactPending,
  deleteContactSucces,
  deleteContactError,
} = contactSlice.actions;
