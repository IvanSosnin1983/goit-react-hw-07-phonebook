import { createSelector } from '@reduxjs/toolkit';

export const selectAllContacts = store => store.contacts.items;
export const selectIsLoading = store => store.contacts.isLoading;
export const selectError = store => store.contacts.error;

export const selectFilter = store => store.filter;
export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const normalizeFilter = filter.trim().toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  }
);
