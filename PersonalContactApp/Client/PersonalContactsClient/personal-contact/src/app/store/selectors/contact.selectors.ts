import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ContactState } from '../reducers/contact.reducer';
import { Contact } from '../../models/contacts';

export const selectContactState = (state: AppState) => {
 console.log('Selecting Contact State', state.contacts);
  return state.contacts;
} 

export const selectAllContacts = createSelector(
  selectContactState,
  (state: ContactState) => state?.contacts ?? [] as Contact[]
);

export const selectContactById = createSelector(
  selectAllContacts,
  (contacts, props) => contacts.find(contact => contact.id === props.id)
);

export const getContactError = createSelector(
  (state: AppState) => state.contacts,
  (contacts: ContactState) => contacts.error
);

export const operationStatus = createSelector(
  selectContactState,
  (state: ContactState) => ({
    loading: state.loading,
    error: state.error,
    success: state.lastOperation?.endsWith('Success') || false,
    failure: state.lastOperation?.endsWith('Failure') || false,
    lastOperation: state.lastOperation
  })
);