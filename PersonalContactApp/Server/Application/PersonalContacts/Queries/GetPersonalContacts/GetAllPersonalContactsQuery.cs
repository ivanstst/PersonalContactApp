using Domain.Entities;
using MediatR;

namespace Application.PersonalContacts.Queries.GetPersonalContacts
{
    public record GetAllPersonalContactsQuery() : IRequest<List<PersonalContact>>
    {

    }
}
