using Domain.Entities;
using Infrastructure.Database.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PersonalContacts.Commands
{
    internal class UpdatePersonalContactHandler : IRequestHandler<UpdatePersonalContactCommand, bool>
    {
        private IPersonalContactRepository _personalContactRepository;
        public UpdatePersonalContactHandler(
           IPersonalContactRepository personalContactRepository
           )
        {
            _personalContactRepository = personalContactRepository;
        }

        public async Task<bool> Handle(UpdatePersonalContactCommand request, CancellationToken cancellationToken)
        {

            var personalContact = new PersonalContact(
                request.Id,
                request.FirstName,
                request.SurName,
                request.DateOfBirth,
                request.Address,
                request.PhoneNumber,
                request.IBAN
                );

            await _personalContactRepository.UpdateAsync(personalContact);
            return true;
        }
    }
}
