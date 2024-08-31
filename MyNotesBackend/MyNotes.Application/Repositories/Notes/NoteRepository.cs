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
using MyNotes.Application.Repositories.NoteLabels;

namespace MyNotes.Application.Repositories.Notes
{
    public class NoteRepository : INoteRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly ILabelRepository _labelRepository;

        public NoteRepository(DatabaseContext databaseContext, ILabelRepository labelRepository)
        {
            _databaseContext = databaseContext;
            _labelRepository=labelRepository;

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
            return _databaseContext.Notes.AsEnumerable().Where(note => note.UserId == userId && !note.IsDeleted && !note.IsArchived).ToList();
        }
        public List<Note> GetDeletedByUserId(Guid userId)
        {
            return _databaseContext.Notes.AsEnumerable().Where(note => note.UserId == userId && note.IsDeleted).ToList();

        }
        public List<Note> GetArchivedByUserId(Guid userId)
        {
            return _databaseContext.Notes.AsEnumerable().Where(note => note.UserId == userId && note.IsArchived && !note.IsDeleted).ToList();
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
            return _databaseContext.Notes.Where(x=>x.IsDeleted==false).ToList();
        }
        public List<Note> GetDeletedNotes(Guid id)
        {
            return _databaseContext.Notes.Where(x => x.UserId==id && x.IsDeleted==true).ToList();
        }
        public List<Note> GetReminderNotes(Guid id)
        {
            return _databaseContext.Notes
         .Where(x => x.UserId==id && x.ReminderDate != null && x.ReminderDate > DateTime.Now && !x.IsDeleted && !x.IsArchived)
         .ToList();
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
            note.ReminderDate = noteDTO.ReminderDate;
            note.Images = noteDTO.Images;
            note.Labels = noteDTO.Labels;
            SaveChanges();
            return note;
        }
        public List<Note> Search(String term,Guid id)
        {
            term.ToLower();
            var notes = _databaseContext.Notes.AsEnumerable()
                .Where(n =>n.UserId==id && (n.Title.ToLower().Contains(term) || n.Content.ToLower().Contains(term)))
                .ToList(); 
            return notes;
        }
        public void Delete(Guid id)
        {
            var note = GetById(id);
            if (note != null && note.DeletedDate!=null)
            {
                _databaseContext.Notes.Remove(note);
                SaveChanges();
            }
        }

        public void SetDeletedDate(Guid id)
        {
            var note = GetById(id);
            if (note != null)
            {
               note.DeletedDate = DateTime.UtcNow; 
                note.IsDeleted = true;
            }
            SaveChanges();
        }
        public void Restore(Guid id)
        {
            var note = GetById(id);
            if (note != null)
            {
                note.IsDeleted = false;
                note.DeletedDate = null;
            }
            SaveChanges();
        }
        //public bool AddLabel(Guid noteId, Guid labelId)
        //{
        //        var note = _databaseContext.Notes.FirstOrDefault(x => x.Id == noteId);

        //    if (note == null)
        //    {
        //        return false;
        //    }

        //    var label =  _labelRepository.GetById(labelId);

        //    if (label == null)
        //    {
        //        return false;
        //    }

        //    if (note.Labels.Any(l => l.Id == labelId))
        //    {
        //        // Label already exists for this note
        //        return false;
        //    }

        //    note.Labels.Add(label);
        //    _databaseContext.SaveChangesAsync();

        //    return true;
        //}
        //public void DeleteLabel(Guid id, Label label)
        //{
        //    var note = GetById(id);
        //    if (note != null)
        //    {
        //        note.Labels.Remove(label);
        //    }
        //    SaveChanges();
        //}
    }
}
