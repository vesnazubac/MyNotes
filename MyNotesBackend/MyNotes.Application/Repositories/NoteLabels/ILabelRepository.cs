using MyNotes.Domain.DTOs;
using MyNotes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Repositories.NoteLabels
{
    public interface ILabelRepository
    {
        List<Label> GetLabels();
        Label GetById(Guid id);

        Label Create(Label note);
        Label Update(LabelPutDTO note, Guid id);
        void Delete(Guid id);
        void SaveChanges();

    }
}
