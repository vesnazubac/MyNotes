
using System.ComponentModel.DataAnnotations;

namespace MyNotes.Domain.Entities
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set;}
        public string Name { get; set; }
        public string UserName { get; set; }
        public string ProfilePicture { get; set; }
        public DateTime RegistrationDate { get; set; }

    }
}
