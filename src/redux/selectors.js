export const selectAllContacts = store => store.contacts.items;
export const selectIsLoading = store => store.contacts.isLoading;
export const selectError = store => store.contacts.error;

export const selectFilter = store => store.filter;

export const selectFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts.items;
  }
  const normalizeFilter = filter.trim().toLowerCase();
  return contacts.items.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );
};
