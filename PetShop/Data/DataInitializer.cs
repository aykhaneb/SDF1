using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PetShop.DAL;

namespace PetShop.Data
{
    public class DataInitializer
    {
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private AppDbContext _dbContext;

        public DataInitializer(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AppDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }
        public async Task SeedData()
        {
            await _dbContext.Database.MigrateAsync();

   
        }
    }
}
