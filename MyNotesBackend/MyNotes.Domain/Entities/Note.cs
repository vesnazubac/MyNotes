using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Domain.Entities
{
    public class Note
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Color { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime EditedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? ReminderDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPinned { get; set; }
        public bool IsArchived { get; set; }
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
        public List<string?>? Images { get;set; }
        // public List<Label> Labels { get; set; } = new List<Label>();
        public List<string?>?Labels{ get; set; }




    }
}
