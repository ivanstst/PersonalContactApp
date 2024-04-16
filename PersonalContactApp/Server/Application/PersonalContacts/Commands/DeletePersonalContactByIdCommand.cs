using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PersonalContacts.Commands
{
    public record DeletePersonalContactByIdCommand(Guid id) : IRequest<bool>
    {
    }
}
