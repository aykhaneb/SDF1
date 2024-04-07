using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using PetShop.Data;
using System.Net.Mail;

namespace PetShop.Services
{
    public class GmailManager : IMailService
    {
        private readonly MailSetting _mailSetting;

        public GmailManager(IOptions<MailSetting> mailSetting)
        {
            _mailSetting = mailSetting.Value;
        }

    }
}
