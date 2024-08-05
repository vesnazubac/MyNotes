using System.ComponentModel.DataAnnotations;

namespace MyNotes.Domain.Entities
{
    public class Note
    {
            [Key]
            public long Id { get; set; }
            public string Title { get; set; }
            public string Content { get; set; }
            public string Color { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime EditedDate { get; set; }
            public bool IsPinned { get; set; }
            public bool IsArchived { get; set; }
            public long UserId { get; set; }
            public long GroupId { get; set; }

    }
}
