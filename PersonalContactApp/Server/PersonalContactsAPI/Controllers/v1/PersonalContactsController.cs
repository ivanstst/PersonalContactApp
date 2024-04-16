using Application.PersonalContacts.Commands;
using Application.PersonalContacts.Queries.GetPersonalContacts;
using Domain.Validators;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PersonalContactsAPI.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalContactsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly CreateContactRequestValidator _validator;

        public PersonalContactsController(
            IMediator mediator,
            CreateContactRequestValidator validator
            )
        {
            _mediator = mediator;
            _validator = validator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContactRequest createContactRequest, CancellationToken cancellationToken)
        {
            var personalContact = CreateContactRequest.CreateContactRequestToPersonalContact(createContactRequest);
            var validationResult = await _validator.ValidateAsync(personalContact, cancellationToken);

            if (validationResult.IsValid is false)
            {
                return BadRequest(validationResult.Errors.ToString());
            }

            var command = new CreatePersonalContactCommand()
            {
                FirstName = createContactRequest.FirstName,
                SurName = createContactRequest.SurName,
                DateOfBirth = createContactRequest.DateOfBirth,
                IBAN = createContactRequest.IBAN,
                PhoneNumber = createContactRequest.PhoneNumber,
                Address = createContactRequest.Address
            };

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateContactRequest updateContactRequest, CancellationToken cancellationToken)
        {

            var personalContact = UpdateContactRequest.UpdateContactRequestToPersonalContact(updateContactRequest);
            var validationResult = await _validator.ValidateAsync(personalContact, cancellationToken);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var command = new UpdatePersonalContactCommand
            {
                Id = id,
                FirstName = updateContactRequest.FirstName,
                SurName = updateContactRequest.SurName,
                DateOfBirth = updateContactRequest.DateOfBirth,
                IBAN = updateContactRequest.IBAN,
                PhoneNumber = updateContactRequest.PhoneNumber,
                Address = updateContactRequest.Address
            };

            var result = await _mediator.Send(command, cancellationToken);

            if (!result)
            {
                return NotFound($"No contact found with ID {id}");
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var query = new GetPersonalContactsByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var query = new GetAllPersonalContactsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            {
                var query = new DeletePersonalContactByIdCommand(id);
                var result = await _mediator.Send(query);
                return Ok(result);
            }
        }
    }
}
