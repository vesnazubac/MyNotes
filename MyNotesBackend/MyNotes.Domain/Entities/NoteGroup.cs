﻿using System.ComponentModel.DataAnnotations;

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
