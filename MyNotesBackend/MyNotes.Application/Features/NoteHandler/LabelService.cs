using MyNotes.Application.Repositories.NoteLabels;
using MyNotes.Application.Repositories.Notes;
using MyNotes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using MyNotes.Domain.Entities;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.DTOs;
using MyNotes.Application.Repositories.NoteLabels;

namespace MyNotes.Application.Features.NoteHandler
{
    public class LabelService
    {
        private readonly ILabelRepository _labelRepository;

        public LabelService(ILabelRepository labelRepository)
        {
            _labelRepository = labelRepository;
        }

        public async Task<Label> Create(Label labelToCreate)
        {
            var createdLabel = _labelRepository.Create(labelToCreate);
            _labelRepository.SaveChanges();
            return createdLabel;
        }
        public async Task<List<Label>> GetAll()
        {
            return _labelRepository.GetLabels();
        }
        public async Task<Label> GetById(Guid id)
        {
            return _labelRepository.GetById(id);
        }
        public async Task<Label> Update(LabelPutDTO labelPutDTO, Guid id)
        {
            return _labelRepository.Update(labelPutDTO, id);
        }
        public async Task DeleteLabel(Guid id)
        {
            _labelRepository.Delete(id);
        }
    }
}
