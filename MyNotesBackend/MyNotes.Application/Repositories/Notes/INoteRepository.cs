using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.Entities;
using MyNotes.Domain.DTOs;
namespace MyNotes.Application.Repositories.Notes
{
     public interface INoteRepository
    {
        List<Note> GetNotes();
        Note GetNoteById(Guid id);

        Note CreateNote(Note note);

        Note UpdateNote(NotePutDTO note);

        Note DeleteNote(NotePutDTO note);
        void SaveChanges();




    }
}
