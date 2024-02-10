import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';

import { setFilter } from '../redux/slice';
import {
  selectFilter,
  selectAllContacts,
  selectFilteredContacts,
} from '../redux/selectors';
import { fetchContacts, addContact, deleteContact } from '../redux/operations';

export const App = () => {
  const filteredContacs = useSelector(selectFilteredContacts);
  const { isLoading, error } = useSelector(selectAllContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = deleteId => {
    dispatch(deleteContact(deleteId));
  };

  const onAddContact = (name, number) => {
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
