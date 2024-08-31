    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Hosting;
    using MyNotes.Application.Features.NoteHandler;
    using MyNotes.Application.Repositories.Notes;
    using MyNotes.Infrastructure.Persistence;
    using MyNotes.Application.Features.Background;
    using MyNotes.Application.Features.Notifications;
using MyNotes.Application.Repositories.Users;
using MyNotes.Application.Features.UserHandler;
using MyNotes.WebAPI.Helpers;
using MyNotes.Domain.Entities;
using MyNotes.Application.Repositories.NoteLabels;

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
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<ILabelRepository, LabelRepository>();
    builder.Services.AddScoped<NoteService>();
    builder.Services.AddHostedService<NotesBackgroundService>();
    builder.Services.AddScoped<UserService>();
    builder.Services.AddScoped<LabelService>();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    builder.Services.AddHostedService<ReminderBackgroundService>();
    builder.Services.AddScoped<ReminderService>();
 //   builder.Services.AddSingleton<IHostedService, ReminderBackgroundService>();
    builder.Services.AddSignalR();





builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            builder => builder.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader());
       
    });

// Define specific origins
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigins",
            builder => builder.WithOrigins("http://localhost:4200/*")  // Replace with your actual origin
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials());  // Allow credentials
    });
    builder.Logging.ClearProviders();
    builder.Logging.AddConsole();
    builder.Logging.SetMinimumLevel(LogLevel.Debug);

var app = builder.Build();

    // Configure the HTTP request pipeline.
    app.UseCors("AllowAll");



    // Configure the HTTP request pipeline.
    app.UseHttpsRedirection();

    app.UseCors(MyAllowSpecificOrigins);

    app.UseAuthorization();

    app.MapControllers();
    app.MapHub<NotificationHub>("/notificationHub");
    app.UseMiddleware<JwtMiddleware>();


app.Run();

