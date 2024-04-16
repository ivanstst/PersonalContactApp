import { createReducer, on } from "@ngrx/store";
import * as ContactActions from "../actions/contact.actions";
import { Contact } from "../../models/contacts";

export interface ContactState {
  contacts: Contact[];
  error: any;
  loading: boolean;
  lastOperation: string | null;
}

export const initialState: ContactState = {
  contacts: [],
  error: null,
  loading: false,
  lastOperation: null
};

export const contactReducer = createReducer(
  initialState,
  on(ContactActions.loadContacts, state => {
    console.log('Loading Contacts');
    return { ...state, loading: true };
  }),
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => {
    console.log('Contacts Loaded', contacts);
    return { ...state, contacts, loading: false };
  }),
  on(ContactActions.loadContactsFailure, (state, { error }) => {
    console.error('Error Loading Contacts', error);
    return { ...state, error, loading: false };
  }),
  on(ContactActions.createContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    loading: false,
    lastOperation: 'createSuccess'
  })),
  on(ContactActions.createContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    lastOperation: 'createFailure'
  })),
  on(ContactActions.updateContactSuccess, (state,) => ({
    ...state,
    loading: false,
    error: null,
    lastOperation: 'updateSuccess'
  })),
  on(ContactActions.updateContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    lastOperation: 'updateFailure'
  })),
  on(ContactActions.deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== id),
    loading: false,
    error: null,
    lastOperation: 'deleteSuccess'
  })),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    lastOperation: 'createFailure'
  })),
  on(ContactActions.resetLastOperation, (state) => ({
    ...state,
    lastOperation: null,
    error: null
}))
  
);