using Application.PersonalContacts.Queries.GetPersonalContacts;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PersonalContacts.Commands
{
    public class UpdateContactRequest
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }

        public static PersonalContact UpdateContactRequestToPersonalContact(UpdateContactRequest updateContactRequest)
        {
            var personalContact = new PersonalContact(
                updateContactRequest.Id,
                updateContactRequest.FirstName,
                updateContactRequest.SurName,
                updateContactRequest.DateOfBirth,
                updateContactRequest.Address,
                updateContactRequest.PhoneNumber,
                updateContactRequest.IBAN
                );

            return personalContact;
        }
    }
}
