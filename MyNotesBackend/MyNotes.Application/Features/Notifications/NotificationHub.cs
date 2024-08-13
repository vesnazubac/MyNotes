using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Features.Notifications
{
        public class NotificationHub:Hub
    {
        public async Task SendReminder(string message)
        {
            await Clients.All.SendAsync("ReceiveReminder", message);
        }
    }
}
