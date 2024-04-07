using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PetShop.DAL;
using PetShop.Data;
using PetShop.Services;

namespace PetShop
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddMvc();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(builder =>
            {
                builder.UseSqlServer(connectionString, builder => builder.MigrationsAssembly("PetShop"));
            });

            builder.Services.Configure<MailSetting>(builder.Configuration.GetSection("MailSettings"));

            builder.Services.AddTransient<IMailService, GmailManager>();

            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                options.User.RequireUniqueEmail = true;

                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.SignIn.RequireConfirmedEmail = false;

                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1);
                options.Lockout.AllowedForNewUsers = true;

            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();


            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var dataInitializer = new DataInitializer(userManager, roleManager, dbContext);
                await dataInitializer.SeedData();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");

                endpoints.MapControllerRoute("default", "{controller=home}/{action=index}/{id?}");
            });



            await app.RunAsync();
        }
    }
}