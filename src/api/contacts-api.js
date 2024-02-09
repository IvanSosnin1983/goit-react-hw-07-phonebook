import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://644fd0b5ba9f39c6ab6d1f0d.mockapi.io/api/contacts',
});

export const requestFetchContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const requestAddContacts = async body => {
  const { data } = await contactsInstance.post('/', body);
  return data;
};

export const requestDeleteContacts = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
