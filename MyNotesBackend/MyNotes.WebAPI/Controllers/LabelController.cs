using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Domain.DTOs;
using MyNotes.Domain.Entities;

namespace MyNotes.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/labels")]
    public class LabelController : ControllerBase
    {
        private readonly LabelService _labelService;
        public LabelController(LabelService labelService)
        {

            _labelService = labelService;
        }

        [HttpPost]
        public async Task<ActionResult<Label>> CreateLabel(Label label)
        {
            await _labelService.Create(label);

            return label;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetNotes()
        {
            return await _labelService.GetAll();
        }
        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<Label>> GetLabelById(Guid id)
        {
            var label = _labelService.GetById(id);

            if (label == null)
            {
                return NotFound();
            }


            return await label;
        }
        [HttpPut("editLabel/{id}")]
        public async Task<IActionResult> UpdateLabel(LabelPutDTO labelPutDTO, Guid id)
        {
            var label = await _labelService.Update(labelPutDTO, id);
            if (label != null)
            {
                return Ok(label);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLabel(Guid id)
        {
            var label = _labelService.DeleteLabel(id);
            return Ok(label);
        }
    }
}
