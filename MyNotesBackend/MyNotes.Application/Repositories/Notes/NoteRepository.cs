using MyNotes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.DTOs;
using MyNotes.Infrastructure.Persistence;

namespace MyNotes.Application.Repositories.Notes
{
    public class NoteRepository : INoteRepository
    {
        private readonly DatabaseContext _databaseContext;

        public NoteRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Note CreateNote(Note note)
        {
            var createdNote = _databaseContext.Notes.Add(note);
            return createdNote.Entity;
        }

        public Note DeleteNote(NotePutDTO note)
        {
            throw new NotImplementedException();
        }

        public Note GetNoteById(long id)
        {
            throw new NotImplementedException();
        }

        public List<Note> GetNotes()
        {
            return _databaseContext.Notes.ToList();
        }

        public void SaveChanges()
        {

            _databaseContext.SaveChangesAsync();
        }

        public Note UpdateNote(NotePutDTO note)
        {
            throw new NotImplementedException();
        }
    }
}
