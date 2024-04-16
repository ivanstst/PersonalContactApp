using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class PersonalContactRepository : IPersonalContactRepository
    {
        private AppDbContext _appDbContext;
        public PersonalContactRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> CreateAsync(PersonalContact personalContact)
        {
            await _appDbContext.PersonalContacts.AddAsync(personalContact);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteById(Guid guid)
        {
            var success = false;
            var res = await _appDbContext.PersonalContacts
                 .Where(pc => pc.Id == guid)
                 .ExecuteDeleteAsync();

            if (res > 0)
            {
                success = true;
            }
            return success;
        }

        public async Task<List<PersonalContact>> GetAllAsync()
        {
            var personalContacts = await _appDbContext.PersonalContacts.ToListAsync();
            return personalContacts;
        }

        public async Task<PersonalContact> GetById(Guid guid)
        {
            var personalContact = await _appDbContext.PersonalContacts.FindAsync(guid);

            if (personalContact == null)
            {
                return null;
            }

            return personalContact;
        }

        public async Task<bool> UpdateAsync(PersonalContact personalContact)
        {
            var existingContact = await _appDbContext.PersonalContacts.FindAsync(personalContact.Id);

            if (existingContact != null)
            {
                existingContact.FirstName = personalContact.FirstName;
                existingContact.SurName = personalContact.SurName;
                existingContact.PhoneNumber = personalContact.PhoneNumber;
                existingContact.Address = personalContact.Address;
                existingContact.DateOfBirth = personalContact.DateOfBirth;
                existingContact.IBAN = personalContact.IBAN;

                await _appDbContext.SaveChangesAsync();
                return true;
            }

            return false; 
        }
    }
}
