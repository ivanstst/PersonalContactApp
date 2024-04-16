using Domain.Entities;
using Infrastructure.Database.Repositories;
using MediatR;

namespace Application.PersonalContacts.Queries.GetPersonalContacts
{
    internal class GetAllPersonalContactsHandler : IRequestHandler<GetAllPersonalContactsQuery, List<PersonalContact>>

    {
        private readonly IPersonalContactRepository _personalContactRepository;
        public GetAllPersonalContactsHandler(IPersonalContactRepository personalContactRepository)
        {
            _personalContactRepository = personalContactRepository; 
        }
        public async Task<List<PersonalContact>> Handle(GetAllPersonalContactsQuery request, CancellationToken cancellationToken)
        {
            var res = await _personalContactRepository.GetAllAsync();
            return res;
        }
    }
}
