using System.ComponentModel.DataAnnotations;

namespace PetShop.ViewModel
{
    public class ChangePasswordViewModel
    {
        public string OldPassword { get; set; }

        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DataType(DataType.Password), Compare(nameof(NewPassword))]
        public string ConfirmPassword { get; set; }
    }
}
