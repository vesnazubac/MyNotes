using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
        public bool IsPinned { get; set; }
        public bool IsArchived { get; set; }
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }

        
        
    }
}
