using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Domain.DTOs
{
    public class NotePutDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Color { get; set; }
        public DateTime EditedDate { get; set; }
        public bool IsPinned { get; set; }
        public string GroupId { get; set; }
        public DateTime? ReminderDate { get; set; }
    }
}
