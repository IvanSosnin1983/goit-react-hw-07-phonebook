import * as contactsApi from '../api/contacts-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const data = await contactsApi.requestFetchContacts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkApi) => {
    try {
      const data = await contactsApi.requestAddContacts(body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (body, thunkApi) => {
      const { contacts } = thunkApi.getState();
      const checkName = contacts.items.find(
        contact => contact.name.toLowerCase() === body.name.toLowerCase()
      );
      if (checkName) {
        alert(`${body.name} is already in contacts.`);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      await contactsApi.requestDeleteContacts(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
