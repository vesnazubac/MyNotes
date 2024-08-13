using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyNotes.Application.Features.Notifications;
using MyNotes.Application.Repositories.Notes;
using MyNotes.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace MyNotes.Application.Features.NoteHandler
{
    public class ReminderService
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly INoteRepository _noteRepository;

        public ReminderService(IHubContext<NotificationHub> hubContext, INoteRepository noteRepository)
        {
            _hubContext = hubContext;
            _noteRepository = noteRepository;
        }

        public async Task CheckReminders()
        {
            var notes = _noteRepository.GetNotes();
            var now = DateTime.Now;

            foreach (var note in notes.Where(n => n.ReminderDate != null && n.ReminderDate >= now && !n.IsDeleted && !n.IsArchived))
            {
                var reminderDate = note.ReminderDate.Value;
                var delay = reminderDate - now;

                if (delay.TotalMilliseconds > 0)
                {
                    // Use Task.Delay to wait until the reminder date
                    await Task.Delay(delay);

                    // Send reminder when the delay is over
                    await _hubContext.Clients.All.SendAsync(
                        "ReceiveReminder",
                        $"🔔 Hey! Don't forget your note titled *'{note.Title}'*:\n\n\"{note.Content}\"\n\nIt's time to take action!"
                    );
                }
            }
        }
    }
}
          
