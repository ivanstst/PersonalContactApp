using Domain.Entities;
using Infrastructure.Database.Repositories;
using MediatR;

namespace Application.PersonalContacts.Queries.GetPersonalContacts
{
    internal class GetPersonalContactsByIdHandler : IRequestHandler<GetPersonalContactsByIdQuery, PersonalContact>

    {
        private readonly IPersonalContactRepository _personalContactRepository;
        public GetPersonalContactsByIdHandler(IPersonalContactRepository personalContactRepository)
        {
            _personalContactRepository = personalContactRepository; 
        }
        public async Task<PersonalContact> Handle(GetPersonalContactsByIdQuery request, CancellationToken cancellationToken)
        {
            var res = await _personalContactRepository.GetById(request.id);
            return res;
        }
    }
}
