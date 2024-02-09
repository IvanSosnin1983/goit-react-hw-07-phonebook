export const getAllContacts = store => store.contacts;

export const getFilter = store => store.filter;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts.items;
  }
  const normalizeFilter = filter.trim().toLowerCase();
  return contacts.items.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );
};
