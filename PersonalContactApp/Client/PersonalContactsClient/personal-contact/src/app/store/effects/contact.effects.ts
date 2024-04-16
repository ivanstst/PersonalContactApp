import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import * as ContactActions from '../actions/contact.actions';

@Injectable()
export class ContactEffects {
    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType(ContactActions.loadContacts),
        mergeMap(() => this.contactService.getContacts()
            .pipe(
                map(contacts => ContactActions.loadContactsSuccess({ contacts })),
                catchError(error => of(ContactActions.loadContactsFailure({ error })))
            )
        )
    ));

    createContact$ = createEffect(() => this.actions$.pipe(
        ofType(ContactActions.createContact),
        mergeMap(action =>
            this.contactService.createContact(action.contact).pipe(
                map(contact => ContactActions.createContactSuccess({ contact })),
                catchError(error => of(ContactActions.createContactFailure({ error: error.message })))
            )
        )
    ));

    updateContact$ = createEffect(() => this.actions$.pipe(
        ofType(ContactActions.updateContact),
        mergeMap(action =>
            this.contactService.updateContact(action.id, action.contact).pipe(
                map(() => ContactActions.updateContactSuccess()),
                catchError(error => of(ContactActions.updateContactFailure({ error: error.message })))
            )
        )
    ));
    deleteContact$ = createEffect(() => this.actions$.pipe(
        ofType(ContactActions.deleteContact),
        mergeMap((action) =>
          this.contactService.deleteContact(action.id).pipe(
            map(() => ContactActions.deleteContactSuccess({ id: action.id })),
            catchError(error => of(ContactActions.deleteContactFailure({ error: error.message })))
          )
        )
      ));
    constructor(
        private actions$: Actions,
        private contactService: ContactService
    ) { }
}