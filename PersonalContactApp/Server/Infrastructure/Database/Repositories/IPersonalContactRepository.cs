using Domain.Entities;

namespace Infrastructure.Database.Repositories
{
    public interface IPersonalContactRepository
    {
        Task<bool> CreateAsync(PersonalContact personalContact);

        Task<PersonalContact> GetById(Guid guid);

        Task<List<PersonalContact>> GetAllAsync();
        Task<bool> DeleteById(Guid guid);
        Task<bool> UpdateAsync(PersonalContact personalContact);
    }
}
