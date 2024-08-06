using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Domain.Entities
{
    public class NoteGroup
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public long UserId { get; set; }
    }
}
