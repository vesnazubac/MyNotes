using Microsoft.EntityFrameworkCore;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Application.Repositories.Notes;
using MyNotes.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
//builder.Services.AddControllers();
builder.Services.AddDbContext<DatabaseContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });
builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<NoteService>();
  
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAll");



// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var noteRepository = services.GetRequiredService<INoteRepository>();
        var context = services.GetRequiredService<DatabaseContext>();

        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);

        var notesToDelete = context.Notes
            .Where(note => note.DeletedDate != null && note.DeletedDate < thirtyDaysAgo && note.IsDeleted==true)
            .ToList();

        foreach (var note in notesToDelete)
        {
            noteRepository.Delete(note.Id);
        }

       noteRepository.SaveChanges();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
}

app.Run();

