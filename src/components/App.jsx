import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/slice';
import { getFilter, getFilteredContacts } from '../redux/selectors';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  console.log(contacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDeleteContact = deleteId => {
    dispatch(deleteContact(deleteId));
  };

  const onAddContact = (name, number) => {
    const checkName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkName) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(addContact({ name, number }));
  };

  const filterChange = ({ target }) => dispatch(setFilter(target.value));

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange} />
      <ContactList contacts={contacts} onDelete={onDeleteContact} />
    </>
  );
};
