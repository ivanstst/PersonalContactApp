using Domain.Entities;
using MediatR;

namespace Application.PersonalContacts.Queries.GetPersonalContacts
{
    public record GetPersonalContactsByIdQuery(Guid id) : IRequest<PersonalContact>
    {
        
    }
}
