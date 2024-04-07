using System.ComponentModel.DataAnnotations;

namespace PetShop.ViewModel
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
