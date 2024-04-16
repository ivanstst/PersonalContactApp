using Domain.Entities;

namespace Application.PersonalContacts.Queries.GetPersonalContacts
{
    public class CreateContactRequest
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }

        public static PersonalContact CreateContactRequestToPersonalContact(CreateContactRequest createContactRequest)
        {
            var personalContact = new PersonalContact(
                createContactRequest.Id,
                createContactRequest.FirstName,
                createContactRequest.SurName,
                createContactRequest.DateOfBirth,
                createContactRequest.Address,
                createContactRequest.PhoneNumber,
                createContactRequest.IBAN
                );

            personalContact.Id = Guid.NewGuid();

            return personalContact;
        }
    }
}
