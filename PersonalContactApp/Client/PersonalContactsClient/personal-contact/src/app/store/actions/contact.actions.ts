import { createAction, props } from '@ngrx/store';
import { Contact } from '../../models/contacts';

export const loadContacts = createAction(
    '[Contact List] Load Contacts');
export const loadContactsSuccess = createAction(
    '[Contact List] Load Contacts Success',
    props<{ contacts: Contact[] }>()
);
export const loadContactsFailure = createAction(
    '[Contact List] Load Contacts Failure',
    props<{ error: any }>()
);

export const createContact = createAction(
    '[Contact] Create Contact',
    props<{ contact: Contact }>()
);

export const createContactSuccess = createAction(
    '[Contact] Create Contact Success',
    props<{ contact: Contact }>()
);

export const createContactFailure = createAction(
    '[Contact] Create Contact Failure',
    props<{ error: any }>()
);

export const updateContact = createAction(
    '[Contact] Update Contact',
    props<{ id: string, contact: Contact }>()
);

export const updateContactSuccess = createAction(
    '[Contact] Update Contact Success'
);

export const updateContactFailure = createAction(
    '[Contact] Update Contact Failure',
    props<{ error: any }>()
);

export const deleteContact = createAction(
    '[Contact] Delete Contact',
    props<{ id: string }>()
);

export const deleteContactSuccess = createAction(
    '[Contact] Delete Contact Success',
    props<{ id: string }>()
);

export const deleteContactFailure = createAction(
    '[Contact] Delete Contact Failure',
    props<{ error: any }>()
);
export const resetLastOperation = createAction(
    '[Contact] Reset Last Operation'
);
