namespace Domain.Entities
{
    public class PersonalContact
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }
        public PersonalContact() { }
        public PersonalContact
            (
            Guid id,
            string firstName,
            string surName,
            DateTime dateOfBirth,
            string address,
            string phoneNumber,
            string iban
            )
        {
            Id = id;
            FirstName = firstName;
            SurName = surName;
            DateOfBirth = dateOfBirth;
            Address = address;
            PhoneNumber = phoneNumber;
            IBAN = iban;

            SetFirstName(firstName);
            SetSurName(surName);
            SetAddress(address);
            SetPhoneNumber(phoneNumber);
            SetIBAN(iban);
        }

        private void SetIBAN(string newIBAN)
        {
            if (string.IsNullOrWhiteSpace(newIBAN)) throw new ArgumentException("IBAN cannot be empty.");
            IBAN = newIBAN;
        }

        private void SetPhoneNumber(string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber)) throw new ArgumentException("Phone number cannot be empty.");
            PhoneNumber = phoneNumber;
        }

        private void SetAddress(string newAddress)
        {
            Address = string.IsNullOrEmpty(newAddress) ? throw new ArgumentNullException(nameof(newAddress), "Address cannot be null.") : newAddress;
        }

        private void SetSurName(string surName)
        {
            if (string.IsNullOrWhiteSpace(surName)) throw new ArgumentException("Surname cannot be empty.");
            SurName = surName;
        }

        private void SetFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName)) throw new ArgumentException("First name cannot be empty.");
            FirstName = firstName;
        }
    }
}
