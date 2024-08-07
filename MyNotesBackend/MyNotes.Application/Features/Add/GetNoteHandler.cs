using MyNotes.Application.Repositories.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.DTOs;
using MyNotes.Domain.Entities;

namespace MyNotes.Application.Features.Add
{
    public class GetNoteHandler
    {
        private readonly INoteRepository _noteRepository;

        public GetNoteHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Note> Create(Note noteToCreate)
        {
            var createdNote = _noteRepository.CreateNote(noteToCreate);
            _noteRepository.SaveChanges();
            return createdNote;
        }

        public async Task<List<Note>> GetAll()
        {
            var notes= _noteRepository.GetNotes();
            return notes;
        }



    }
}

