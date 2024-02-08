export const getAllContacts = ({ contacts }) => contacts.items;

export const getFilter = ({ contacts }) => contacts.filter;

export const getFilteredContacts = ({ contacts }) => {
  if (!contacts.filter) {
    return contacts.items;
  }
  const normalizeFilter = contacts.filter.toLowerCase();
  return contacts.items.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );
};
