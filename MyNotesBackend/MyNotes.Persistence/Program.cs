using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyNotes.Infrastructure.Persistence;
using Microsoft.Extensions.Logging;

class Program
{
    static void Main(string[] args)
    {

        var configuration = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "Presentation.MyNotes.WebAPI")) 
           .AddJsonFile("appsettings.json")
           .Build();

        // Kreirajte servis kolekciju i dodajte DbContext
        var serviceCollection = new ServiceCollection();
        ConfigureServices(serviceCollection, configuration);

        // Kreirajte servis provider
        var serviceProvider = serviceCollection.BuildServiceProvider();

        // Koristite DbContext iz servisa
        using (var context = serviceProvider.GetRequiredService<DatabaseContext>())
        {
            context.Database.Migrate(); // Primijenite migracije
        }
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
       
        services.AddDbContext<DatabaseContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
           .LogTo(Console.WriteLine, LogLevel.Information));
        services.AddDbContext<DatabaseContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));
    }
}
