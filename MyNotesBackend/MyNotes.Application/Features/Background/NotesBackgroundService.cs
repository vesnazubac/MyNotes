using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyNotes.Application.Repositories.Notes;
using MyNotes.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Features.Background
{

    public class NotesBackgroundService:BackgroundService
    {
        public readonly IServiceScopeFactory _scopeFactory;
        public NotesBackgroundService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var services = scope.ServiceProvider;

                    try
                    {
                        var noteRepository = services.GetRequiredService<INoteRepository>();
                        var context = services.GetRequiredService<DatabaseContext>();

                        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);

                        var notesToDelete = context.Notes
                            .Where(note => note.DeletedDate != null
                                           && note.DeletedDate < thirtyDaysAgo
                                           && note.IsDeleted == true)
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

                await Task.Delay(TimeSpan.FromDays(1), stoppingToken); 
            }
        }
    }

}


