using MyNotes.Application.Repositories.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.Entities;
using MyNotes.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace MyNotes.Application.Features.NoteHandler
{
    public class NoteService
    {
        private readonly INoteRepository _noteRepository;

        public NoteService(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Note> Create(Note noteToCreate)
        {
            noteToCreate.CreatedDate = DateTime.Now;
            noteToCreate.EditedDate = DateTime.Now;
            noteToCreate.DeletedDate = null;
            noteToCreate.IsArchived = false;
            noteToCreate.IsDeleted=false;
            var createdNote = _noteRepository.Create(noteToCreate);
            _noteRepository.SaveChanges();
            return createdNote;
        }

        public async Task Archive(Guid id)
        {
            var note = _noteRepository.GetById(id);
            if (note == null) {
                throw new Exception("Note not found");
            }
            else
            {
                _noteRepository.Archive(id);
            }  
        }

        public async Task<List<Note>> GetAll()
        {
            return  _noteRepository.GetNotes();
        }
        public async Task<Note> GetById(Guid id)
        {
            return _noteRepository.GetById(id);
        }
        public async Task<List<Note>> GetByTitle(String title)
        {
            return _noteRepository.GetByTitle(title);
        }

        public async Task<List<Note>> GetByContent(String content)
        {
            return _noteRepository.GetByContent(content);
        }
        public async Task<List<Note>> GetByUserId(Guid userId)
        {
            return _noteRepository.GetByUserId(userId);
        }
        public async Task<Note> Update(NotePutDTO notePutDTO, Guid id)
        {
            return _noteRepository.Update(notePutDTO, id);
        }
        public async Task<List<Note>> SearchNotes(string term)
        {
            return _noteRepository.Search(term);
        }
        public async Task DeleteNote(Guid id)
        {
             _noteRepository.Delete(id);
        }
        public async Task SetDeletedDate(Guid id)
        {
            var note = _noteRepository.GetById(id);
            if (note == null)
            {
                throw new Exception("Note not found");
            }
            else
            {
                _noteRepository.SetDeletedDate(id);
            }
        }
        public async Task<List<Note>> GetDeletedNotes()
        {
            return _noteRepository.GetDeletedNotes();
        }
        public async Task Restore(Guid id)
        {
            var note = _noteRepository.GetById(id);
            if (note == null)
            {
                throw new Exception("Note not found");
            }
            else
            {
                _noteRepository.Restore(id);
            }
        }

    }
}
