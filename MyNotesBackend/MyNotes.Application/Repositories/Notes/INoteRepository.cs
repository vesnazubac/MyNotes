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
        Note GetById(Guid id);
        List<Note> GetByUserId(Guid userId);
        List<Note> GetByTitle(String title);
        List<Note> GetByContent(String content);

        Note Create(Note note);

        Note Update(NotePutDTO note,Guid id);

        Note Delete(NotePutDTO note);
        void Archive(Guid id);
        void SaveChanges();




    }
}
