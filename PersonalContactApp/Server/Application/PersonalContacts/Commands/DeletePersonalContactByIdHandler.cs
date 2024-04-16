using Infrastructure.Database.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PersonalContacts.Commands
{
    internal class DeletePersonalContactByIdHandler : IRequestHandler<DeletePersonalContactByIdCommand, bool>
    {
        private readonly IPersonalContactRepository _personalContactRepository;

        public DeletePersonalContactByIdHandler(IPersonalContactRepository personalContactRepository)
        {
            _personalContactRepository = personalContactRepository;
        }
        public async Task<bool> Handle(DeletePersonalContactByIdCommand request, CancellationToken cancellationToken)
        {
            var res = await _personalContactRepository.DeleteById(request.id);

            return res;
        }
    }
}
