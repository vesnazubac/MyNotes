using Microsoft.EntityFrameworkCore;
using MyNotes.Domain.Entities;

namespace MyNotes.Infrastructure.Persistence
{
    public class DatabaseContext:DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteGroup> NoteGroups { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Label> Labels{ get; set; }
        public DatabaseContext(DbContextOptions options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "MyNotes.db");
        }
        public string DbPath { get; }

        public DatabaseContext()
        {
           
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Note>()
        //        .HasMany(n => n.Labels)
        //        .WithMany()
        //        .UsingEntity<Dictionary<string, object>>(
        //            "NoteLabel",
        //            j => j.HasOne<Label>().WithMany().HasForeignKey("LabelId"),
        //            j => j.HasOne<Note>().WithMany().HasForeignKey("NoteId"));
        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
