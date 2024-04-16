import { Routes } from '@angular/router';
import { ContactListComponent } from './components/components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/components/contact-details/contact-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'contacts', component: ContactListComponent },
    { path: 'contact-detail/new', component: ContactDetailsComponent },
    { path: 'contact-detail/:id', component: ContactDetailsComponent }
];
