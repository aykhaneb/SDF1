using System.ComponentModel.DataAnnotations;

namespace PetShop.ViewModel
{
    public class RegisterViewModel
    {
        [Required]
        public string? Fullname { get; set; }
        [Required]
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


    }
}
