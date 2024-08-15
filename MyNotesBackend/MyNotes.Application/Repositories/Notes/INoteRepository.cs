﻿using System;
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
        List<Note> GetDeletedNotes();
        List<Note> GetReminderNotes(Guid id);
        Note GetById(Guid id);
        List<Note> GetByUserId(Guid userId);
        List<Note>GetDeletedByUserId(Guid userId);
        List<Note> GetArchivedByUserId(Guid userId);
        List<Note> GetByTitle(String title);
        List<Note> GetByContent(String content);
        Note Create(Note note);
        Note Update(NotePutDTO note,Guid id);
        Note Delete(NotePutDTO note);
        void Archive(Guid id);
        void SaveChanges();
        List<Note> Search(String term);
        void Delete(Guid id);
        void SetDeletedDate(Guid id);
        void Restore(Guid id);
    }
}
