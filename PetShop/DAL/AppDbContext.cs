using Microsoft.EntityFrameworkCore;

namespace PetShop.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
