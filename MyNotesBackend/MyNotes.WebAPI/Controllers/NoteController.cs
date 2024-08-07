
using Microsoft.AspNetCore.Mvc;
using MyNotes.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyNotes.Infrastructure.Persistence;


namespace MyNotes.WebAPI.Controllers
{
        [ApiController]
        [Route("/api/notes")]
        public class NotesController : ControllerBase
        {
            private readonly DatabaseContext _context;

            public NotesController(DatabaseContext context)
            {
                _context = context;
            }

            // GET: api/notes
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
            {
                return await _context.Notes.ToListAsync();
            }

            // GET: api/notes/{id}
            [HttpGet("{id}")]
            public async Task<ActionResult<Note>> GetNoteById(long id)
            {
                var note = await _context.Notes.FindAsync(id);

                if (note == null)
                {
                    return NotFound();
                }

                return note;
            }

            // POST: api/notes
            [HttpPost]
            public async Task<ActionResult<Note>> CreateNote(Note note)
            {
                _context.Notes.Add(note);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
            }

            // PUT: api/notes/{id}
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateNote(long id, Note note)
            {
                if (id != note.Id)
                {
                    return BadRequest();
                }

                _context.Entry(note).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NoteExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // DELETE: api/notes/{id}
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteNote(long id)
            {
                var note = await _context.Notes.FindAsync(id);
                if (note == null)
                {
                    return NotFound();
                }

                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool NoteExists(long id)
            {
                return _context.Notes.Any(e => e.Id == id);
            }
        }
    }


