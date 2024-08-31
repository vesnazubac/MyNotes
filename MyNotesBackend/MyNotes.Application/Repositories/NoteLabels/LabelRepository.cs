using MyNotes.Application.Repositories.NoteLabels;
using MyNotes.Domain.DTOs;
using MyNotes.Domain.Entities;
using MyNotes.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNotes.Application.Repositories.NoteLabels
{
    public class LabelRepository : ILabelRepository
    {
        private readonly DatabaseContext _databaseContext;
        public LabelRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Label Create(Label label)
        {
            var createdLabel = _databaseContext.Labels.Add(label);
            return createdLabel.Entity;
        }


        public void Delete(Guid id)
        {
            var label = GetById(id);
            if (label != null)
            {
                _databaseContext.Labels.Remove(label);
                _databaseContext.SaveChangesAsync();
            }
        }

        public void SaveChanges()
        {
            _databaseContext.SaveChangesAsync();
        }
        public Label GetById(Guid id)
        {
            return _databaseContext.Labels.FirstOrDefault(x => x.Id == id);

        }


        public List<Label> GetLabels()
        {
            return _databaseContext.Labels.ToList();
        }


        public Label Update(LabelPutDTO labelDTO, Guid id)
        {
            var label = GetById(id);
            if (label == null)
            {
                throw new Exception("Label not found");
            }
            label.Name = labelDTO.Name;
            SaveChanges();
            return label;
        }


    }
}
