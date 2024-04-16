using Domain.Entities;
using FluentValidation;

namespace Domain.Validators
{
    public class CreateContactRequestValidator : AbstractValidator<PersonalContact>
    {
        //TODO Potentially extract phone number and IBAN to a separete validator each for reusability and then use them here.
        public CreateContactRequestValidator()
        {
            RuleFor(command => command.FirstName).NotEmpty().WithMessage("First name is required.");
            RuleFor(command => command.SurName).NotEmpty().WithMessage("Surname is required.");

            RuleFor(x => x.PhoneNumber)
           .NotEmpty()
           //.Matches(@"^\+\d{1,3}\s?[-\(]?\d{1,4}[-\)\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$")
           .WithMessage("Invalid phone number format.");

            RuleFor(x => x.IBAN)
            .NotEmpty()
            .Length(15, 34)
            .Matches(@"^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$")
            .WithMessage("IBAN should be in the format of AA12123456789012345678912345");
        }
    }
}
