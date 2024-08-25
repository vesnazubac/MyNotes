using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Application.Features.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Features.Background
{
    public class ReminderBackgroundService:BackgroundService
    {

        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IServiceProvider _serviceProvider;

        public ReminderBackgroundService(IHubContext<NotificationHub> hubContext, IServiceProvider serviceProvider)
        {
            _hubContext = hubContext;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var reminderService = scope.ServiceProvider.GetRequiredService<ReminderService>();
                    await reminderService.CheckReminders();
                }
                await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken); 
            }
        }
    }
}
