using MyNotes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.DTOs;
using MyNotes.Infrastructure.Persistence;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;

namespace MyNotes.Application.Repositories.Notes
{
    public class NoteRepository : INoteRepository
    {
        private readonly DatabaseContext _databaseContext;

        public NoteRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Note Create(Note note)
        {
            var createdNote = _databaseContext.Notes.Add(note);
            return createdNote.Entity;
        }

        public Note Delete(NotePutDTO note)
        {
            throw new NotImplementedException();
        }

        public Note GetById(Guid id)
        {
            return _databaseContext.Notes.FirstOrDefault(x => x.Id == id);

        }
        public List<Note> GetByUserId(Guid userId)
        {
            return _databaseContext.Notes.AsEnumerable().Where(note => note.UserId == userId).ToList();

        }
        public List<Note> GetByTitle(String title)
        {
            return _databaseContext.Notes.AsEnumerable()
                .Where(x => x.Title.Contains(title, StringComparison.OrdinalIgnoreCase))
          .ToList();

        }

        public List<Note> GetByContent(String content)
        {
            return _databaseContext.Notes.AsEnumerable()
       .Where(x => x.Content.Contains(content, StringComparison.OrdinalIgnoreCase))
       .ToList();
        }

        public List<Note> GetNotes()
        {
            return _databaseContext.Notes.ToList();
        }

        public void SaveChanges()
        {
            _databaseContext.SaveChangesAsync();
        }
        public void Archive(Guid id)
        {
            var note = GetById(id);
            if (note != null)
            {
                if (note.IsArchived == true)
                {
                    note.IsArchived = false;
                }
                else
                {
                    note.IsArchived = true;
                }
                
            }
            SaveChanges();
        }

        public Note Update(NotePutDTO noteDTO, Guid id)
        {
            var note = GetById(id);
            if (note == null)
            {
                throw new Exception("Note not found");
            }
            note.Title = noteDTO.Title;
            note.Content = noteDTO.Content;
            note.Color = noteDTO.Color;
            note.EditedDate = DateTime.UtcNow;
            note.IsPinned = noteDTO.IsPinned;
            SaveChanges();
            return note;
        }
        public List<Note> Search(String term)
        {
            term.ToLower();
            var notes = _databaseContext.Notes.AsEnumerable()
                .Where(n => n.Title.ToLower().Contains(term) || n.Content.ToLower().Contains(term))
                .ToList(); 
            return notes;
        }
    }
}
