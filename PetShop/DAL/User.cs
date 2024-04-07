using Microsoft.AspNetCore.Identity;

namespace PetShop.DAL
{
    public class User : IdentityUser
    {
        public string? Fullname { get; set; }
    }
}
