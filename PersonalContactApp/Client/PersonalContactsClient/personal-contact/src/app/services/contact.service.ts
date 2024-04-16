import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //TODO Extract this to .env file
  private apiUrl = 'https://localhost:7241/api/PersonalContacts/'; // URL to web api
  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    console.log('Getting Contacts');
    return this.http.get<Contact[]>(this.apiUrl);
  }
  createContact(contact: Contact): Observable<Contact> {
    console.log('Creating Contact');
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    console.log('Updating Contact');
    const url = `${this.apiUrl}${id}`;
    return this.http.put<Contact>(url, contact);
  }

deleteContact(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}${id}`);
}

}
