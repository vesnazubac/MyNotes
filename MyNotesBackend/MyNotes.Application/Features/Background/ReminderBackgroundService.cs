using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Application.Features.Notifications;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Features.Background
{
    public class ReminderBackgroundService : BackgroundService
    {

        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ReminderBackgroundService> _logger;

        public ReminderBackgroundService(IHubContext<NotificationHub> hubContext, IServiceProvider serviceProvider,
              ILogger<ReminderBackgroundService> logger)
        {
            _hubContext = hubContext;
            _serviceProvider = serviceProvider;
            _logger=logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
           Debug.WriteLine("U REMINDER SERVICE");

            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var reminderService = scope.ServiceProvider.GetRequiredService<ReminderService>();
                        Debug.WriteLine("CALLING REMINDERS...");
                        await reminderService.CheckReminders();

                        Debug.WriteLine("REMINDERS CALLED");

                    }
                    await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken);
                }

            }
            catch (Exception ex)
            {
             
              Debug.WriteLine($"Error in ReminderBackgroundService: {ex.Message}");
            }
        }
    }
}

