import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';

import { setFilter } from '../redux/slice';
import {
  getFilter,
  getAllContacts,
  getFilteredContacts,
} from '../redux/selectors';
import { fetchContacts, addContact, deleteContact } from '../redux/operations';

export const App = () => {
  const filteredContacs = useSelector(getFilteredContacts);
  const { items, isLoading, error } = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = deleteId => {
    dispatch(deleteContact(deleteId));
  };

  const onAddContact = (name, number) => {
    const checkName = items.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkName) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(addContact({ name, number }));
  };

  const filterChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange} />
      {isLoading && <p>. . . Loading</p>}
      {error && <p>{error}</p>}
      {Boolean(filteredContacs.length) && (
        <ContactList contacts={filteredContacs} onDelete={onDeleteContact} />
      )}
    </>
  );
};
