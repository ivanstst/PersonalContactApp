using Domain.Entities;
using Infrastructure.Database.Repositories;
using MediatR;

namespace Application.PersonalContacts.Commands
{
    public class CreatePersonalContactHandler : IRequestHandler<CreatePersonalContactCommand, bool>
    {
        private readonly IPersonalContactRepository _personalContactRepository;
        public CreatePersonalContactHandler(
            IPersonalContactRepository personalContactRepository
            )
        {
            _personalContactRepository = personalContactRepository;
        }

        public async Task<bool> Handle(CreatePersonalContactCommand request, CancellationToken cancellationToken)
        {

            var personalContact = new PersonalContact(
                Guid.NewGuid(),
                request.FirstName,
                request.SurName,
                request.DateOfBirth,
                request.Address,
                request.PhoneNumber,
                request.IBAN
                );

            await _personalContactRepository.CreateAsync(personalContact);
            return true;
        }
    }
}
