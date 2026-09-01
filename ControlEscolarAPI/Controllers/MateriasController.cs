using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControlEscolarAPI.Data;
using ControlEscolarAPI.Models;

namespace ControlEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MateriasController : ControllerBase
    {
        private readonly ControlEscolarContext _context;

        public MateriasController(ControlEscolarContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Materia>>> GetMaterias()
        {
            return await _context.Materias.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Materia>> GetMateria(int id)
        {
            var materia = await _context.Materias.FindAsync(id);

            if (materia == null)
            {
                return NotFound();
            }

            return materia;
        }

        [HttpPost]
        public async Task<ActionResult<Materia>> PostMateria(Materia Materia)
        {
            _context.Materias.Add(Materia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMateria), new { id = Materia.IdMateria }, Materia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMateria(int id, Materia Materia)
        {
            if (id != Materia.IdMateria)
            {
                return BadRequest();
            }

            _context.Entry(Materia).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMateria(int id)
        {
            var Materia = await _context.Materias.FindAsync(id);
            if (Materia == null)
            {
                return NotFound();
            }

            _context.Materias.Remove(Materia);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
