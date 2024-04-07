using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PetShop.DAL;
using PetShop.Services;
using PetShop.ViewModel;

namespace PetShop.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMailService _mailManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IMailService mailManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mailManager = mailManager;
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = new User
            {
                UserName = model.Username,
                Fullname = model.Fullname,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {

                await _userManager.AddToRoleAsync(user, "Admin");

                await _signInManager.SignInAsync(user, isPersistent: false);

                return RedirectToAction("Index", "Home");
            }
            else
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);

                }
                return View();
            }

            //var roleresult = await _roleManager.CreateAsync(new IdentityRole
            //{

            //    Name = "Admin"

            //});

            //if (roleresult.Succeeded)
            //{
            //    foreach (var item in roleresult.Errors)
            //    {
            //        ModelState.AddModelError("", item.Description);

            //    }

            //    return View();

            //}

        }
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Index", "Home");
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var existUser = await _userManager.FindByNameAsync(model.Username);

            if (existUser == null)
            {
                ModelState.AddModelError("", "Username or password is incorrect");

                return View();

            }

            var result = await _signInManager.PasswordSignInAsync(existUser, model.Password, false, true);

            if (result.IsLockedOut)
            {
                ModelState.AddModelError("", "You banned. Please try a few moments later");

                return View();
            }


            if (!result.Succeeded)
            {
                return View();
            }

            return RedirectToAction("Index", "Home");

        }
        [Authorize]
        [Authorize]
        public IActionResult ChangePassword()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var username = User?.Identity?.Name;

            if (username == null)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByNameAsync(username);

            var userId = user.Id;

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                }

                return View();
            }

            return RedirectToAction("Index", "Home");
        }

        public IActionResult ForgottenPassword()
        {
            return View();
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ForgottenPassword(ForgottenPasswordViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        ModelState.AddModelError("", "Enter the email address");

        //        return View();
        //    }

        //    var existUser = await _userManager.FindByEmailAsync(model.Email);

        //    if (existUser == null)
        //    {
        //        ModelState.AddModelError("", "This email address is not exist");

        //        return View();
        //    }

        //    var token = await _userManager.GeneratePasswordResetTokenAsync(existUser);

        //    var resetLink = Url.Action(nameof(ResetPassword),
        //        "Account", new { email = model.Email, token }, Request.Scheme, Request.Host.ToString());

        //    var mailRequest = new RequestEmail
        //    {
        //        ToEmail = model.Email,
        //        Body = resetLink,
        //        Subject = "Reset password link"
        //    };

        //    await _mailManager.SendEmailAsync(mailRequest);

        //    return RedirectToAction(nameof(Login));
        //}

        //public IActionResult ResetPassword(string email, string token)
        //{
        //    return View(new ResetPasswordViewModel { Email = email, Token = token });
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        ModelState.AddModelError("", "Anything is wrong");

        //        return View();
        //    }

        //    var user = await _userManager.FindByEmailAsync(model.Email);

        //    if (user == null)
        //        return BadRequest();

        //    var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

        //    if (result.Succeeded)
        //    {
        //        return RedirectToAction(nameof(Login));
        //    }

        //    foreach (var item in result.Errors)
        //    {
        //        ModelState.AddModelError("", item.Description);
        //    }

        //    return View();
        //}

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
