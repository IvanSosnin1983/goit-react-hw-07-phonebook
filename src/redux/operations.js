import {
  fetchContactsPending,
  fetchContactsSucces,
  fetchContactsError,
  addContactPending,
  addContactSucces,
  addContactError,
  deleteContactPending,
  deleteContactSucces,
  deleteContactError,
} from './slice';
import * as contactsApi from '../api/contacts-api';

export const fetchContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(fetchContactsPending());
      const data = await contactsApi.requestFetchContacts();
      dispatch(fetchContactsSucces(data));
    } catch (error) {
      dispatch(fetchContactsError(error.message));
    }
  };
  return func;
};

export const addContact = body => {
  const func = async dispatch => {
    try {
      dispatch(addContactPending());
      const data = await contactsApi.requestAddContacts(body);
      dispatch(addContactSucces(data));
    } catch (error) {
      dispatch(addContactError(error.message));
    }
  };
  return func;
};

export const deleteContact = id => {
  const func = async dispatch => {
    try {
      dispatch(deleteContactPending());
      await contactsApi.requestDeleteContacts(id);
      dispatch(deleteContactSucces(id));
    } catch (error) {
      dispatch(deleteContactError(error.message));
    }
  };
  return func;
};
