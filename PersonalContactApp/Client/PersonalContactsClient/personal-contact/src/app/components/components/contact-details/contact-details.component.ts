import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { map, switchMap, of, tap, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import * as fromContactSelectors from '../../../store/selectors/contact.selectors';
import * as ContactActions from '../../../store/actions/contact.actions';
import { Contact } from '../../../models/contacts';
@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  contactForm: FormGroup;
  private contactId: string;
  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,) {

    this.createForm();
  }
  private destroy$ = new Subject<void>();
  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        this.contactId = id !== 'new' ? id : null;
        if (id !== 'new') {
          return this.store.pipe(select(fromContactSelectors.selectContactById, { id }));
        } else {
          return of(this.createEmptyContact());
        }
      }),
      tap(contactData => {
        if (contactData && contactData.dateOfBirth) {
          const contact = { ...contactData }
          contact.dateOfBirth = new Date(contact.dateOfBirth);
          if (typeof contact.dateOfBirth === 'string') {
            contact.dateOfBirth = new Date(contact.dateOfBirth);
          }
          this.contactForm.patchValue(contact);
        }
      })
    ).subscribe();

    this.store.select(fromContactSelectors.operationStatus)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
      )
      .subscribe(status => {
        if (status.lastOperation === 'createSuccess') {
          this.displaySuccess('Contact created successfully');
          setTimeout(() => this.router.navigate(['/contacts']), 1000);
          this.store.dispatch(ContactActions.resetLastOperation());
        }
        else if (status.lastOperation === 'createFailure') {
          this.displayError('Creation failed: ' + status.error);
          this.store.dispatch(ContactActions.resetLastOperation());
        }
        else if (status.lastOperation === 'updateSuccess') {
          this.displaySuccess('Contact updated successfully');
          this.store.dispatch(ContactActions.resetLastOperation());
          setTimeout(() => this.router.navigate(['/contacts']), 1000);
        }
        else if (status.lastOperation === 'updateFailure') {
          this.displayError('Update failed: ' + status.error);
          this.store.dispatch(ContactActions.resetLastOperation());
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  createForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      surName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      iban: ['', Validators.required]
    })
  }


  createEmptyContact() {
    return { firstName: '', surName: '', phoneNumber: '', address: '', dateOfBirth: new Date() };
  }
  onSubmit() {
    if (this.contactId) {
      const formValue: Contact = {
        ...this.contactForm.value,
        id: this.contactId
      };
      this.store.dispatch(ContactActions.updateContact({ id: this.contactId, contact: formValue }));
    }
    else {
      this.store.dispatch(ContactActions.createContact({ contact: this.contactForm.value }));
    }
  }
  displaySuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  displayError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
