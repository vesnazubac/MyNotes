using Microsoft.AspNetCore.Mvc;
using MyNotes.Domain.Entities;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Domain.DTOs;


namespace MyNotes.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/notes")]
    public class NotesController : ControllerBase
    {

        private readonly NoteService _noteService;
        public NotesController(NoteService noteService)
        {

            _noteService = noteService;
        }

        [HttpPost]
        public async Task<ActionResult<Note>> CreateNote(Note note)
        {
            await _noteService.Create(note);

            return note;
        }

        // GET: api/notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _noteService.GetAll();
        }
        [HttpGet("deletedNotes")]
        public async Task<ActionResult<IEnumerable<Note>>> GetDeletedNotes(Guid id)
        {
            return await _noteService.GetDeletedNotes(id);
        }
        [HttpGet("reminderNotes/{id}")]
        public async Task<ActionResult<IEnumerable<Note>>> GetReminderNotes(Guid id)
        {
            return await _noteService.GetReminderNotes(id);
        }

        // GET: api/notes/{id}
        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<Note>> GetNoteById(Guid id)
        {
            var note = _noteService.GetById(id);

            if (note == null)
            {
                return NotFound();
            }

            return await note;
        }
        [HttpGet("by-title/{title}")]
        public async Task<ActionResult<List<Note>>> GetNoteByTitle(String title)
        {
            var note = _noteService.GetByTitle(title);

            if (note == null)
            {
                return NotFound();
            }

            return await note;
        }

        [HttpGet("by-content/{content}")]
        public async Task<ActionResult<List<Note>>> GetNoteByContent(String content)
        {
            var note = _noteService.GetByContent(content);

            if (note == null)
            {
                return NotFound();
            }

            return await note;
        }

        [HttpGet("by-userId/{userId}")]
        public async Task<ActionResult<List<Note>>> GetNoteByUserId(Guid userId)
        {
            var notes = _noteService.GetByUserId(userId);

            if (notes == null)
            {
                return Ok(notes);
            }

            return await notes;
        }
        [HttpGet("deleted/by-userId/{userId}")]
        public async Task<ActionResult<List<Note>>> GetDeletedNotesByUserId(Guid userId)
        {
            var note = _noteService.GetDeletedByUserId(userId);

            if (note == null)
            {
                return NotFound();
            }

            return await note;
        }
        [HttpGet("archived/by-userId/{userId}")]
        public async Task<ActionResult<List<Note>>> GetArchivedNotesByUserId(Guid userId)
        {
            var note = _noteService.GetArchivedByUserId(userId);

            if (note == null)
            {
                return NotFound();
            }

            return await note;
        }

        [HttpPut("archive/{id}")]
        public async Task<IActionResult> ArchiveNote(Guid id)
        {
            var note = await _noteService.GetById(id);
            if (note == null)
            {
                return NotFound();
            }
            _noteService.Archive(id);
            return NoContent();
        }
        [HttpPut("editNote/{id}")]
        public async Task<IActionResult> UpdateNote(NotePutDTO notePutDTO, Guid id)
        {
            var note = await _noteService.Update(notePutDTO, id);
            if (note != null)
            {
                return Ok(note);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("search/{term}/{id}")]
        public async Task<ActionResult<List<Note>>> SearchNotes(string term,Guid id)
        {
            var notes = await _noteService.SearchNotes(term,id);

            if (notes == null || notes.Count == 0)
            {
                return Ok(notes);
            }

            return Ok(notes);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult>DeleteNote(Guid id)
        {
            var note = _noteService.DeleteNote(id);
            return Ok(note);
        }

        [HttpPut("setDeletedDate/{id}")]
        public async Task<IActionResult> SetDeletedDate(Guid id)
        {
            var note = await _noteService.GetById(id);
            if (note == null)
            {
                return NotFound();
            }
            _noteService.SetDeletedDate(id);
            return NoContent();
        }

        [HttpPut("restore/{id}")]
        public async Task<IActionResult> Restore(Guid id)
        {
            var note = await _noteService.GetById(id);
            if (note == null)
            {
                return NotFound();
            }
            _noteService.Restore(id);
            return NoContent();
        }
    }
}



