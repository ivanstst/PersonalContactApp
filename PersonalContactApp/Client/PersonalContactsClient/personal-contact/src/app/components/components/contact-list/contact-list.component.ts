import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Contact } from '../../../models/contacts';
import * as fromContactSelectors from '../../../store/selectors/contact.selectors';
import * as ContactActions from '../../../store/actions/contact.actions';
import { CommonModule, NgFor } from '@angular/common';
import { AppState } from '../../../app.state';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    ButtonModule,
    TableModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contacts$: Observable<Contact[]> = this.store.pipe(select(fromContactSelectors.selectAllContacts), map(contacts => contacts ?? [] as Contact[]));
  contactDialog: boolean = false;
  selectedContact: Contact | null = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.contacts$ = this.store.pipe(
      select(fromContactSelectors.selectAllContacts),
      tap(contacts => console.log('Contacts Loaded', contacts)),
      map(contacts => contacts ?? [] as Contact[]),
      tap(contacts => console.log('final contacts for table ', contacts)),
    );
  }

  ngOnInit() {

    this.store.select(fromContactSelectors.operationStatus)
    .subscribe(status => {
      if (status.loading) {
        // TODO show loading indicator
      }
      if (status.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Operation successful' });
        this.store.dispatch(ContactActions.resetLastOperation());
      } else if (status.failure) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Operation failed: ' + status.error });
        this.store.dispatch(ContactActions.resetLastOperation());
      }
    });

    this.store.dispatch(ContactActions.loadContacts());
  };

  openNew() {
    this.selectedContact = new Contact();
    this.contactDialog = true;
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact };
    this.router.navigate(['/contact-detail', contact]);
    console.log('selected contact', JSON.stringify(this.selectedContact));
    this.contactDialog = true;

  }

  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contact?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(ContactActions.deleteContact({ id: contact.id }));
      },
      reject: () => {
      }
    });
  }
}
