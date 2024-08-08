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
    public  class AddNoteHandler
    {
        private readonly INoteRepository _noteRepository;

        public AddNoteHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Note> Create(Note noteToCreate)
        {
     

            // Use the repository to add the note
            var createdNote = _noteRepository.CreateNote(noteToCreate);

            // Save changes to persist the note
            _noteRepository.SaveChanges();

            return createdNote;
        }
    }
}

