using Microsoft.EntityFrameworkCore;
using MyNotes.Domain.Entities;

namespace MyNotes.Infrastructure.Persistence
{
    public class DatabaseContext:DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteGroup> NoteGroups { get; set; }
        public DbSet<User> Users { get; set; }
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }
        public string DbPath { get; }

        public DatabaseContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "MyNotes.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}
