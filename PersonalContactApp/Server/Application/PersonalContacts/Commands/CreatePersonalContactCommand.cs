using MediatR;

namespace Application.PersonalContacts.Commands
{
    public class CreatePersonalContactCommand : IRequest<bool>
    {
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }
    }
}
