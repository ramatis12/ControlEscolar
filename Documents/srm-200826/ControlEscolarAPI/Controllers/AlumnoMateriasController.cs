using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControlEscolarAPI.Data;
using ControlEscolarAPI.Models;

namespace ControlEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlumnoMateriasController : ControllerBase
    {
        private readonly ControlEscolarContext _context;

        public AlumnoMateriasController(ControlEscolarContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlumnoMateria>>> GetAlumnoMaterias()
        {
            return await _context.AlumnoMaterias.ToListAsync();
        }

        [HttpGet("{idAlumno}")]
        public async Task<ActionResult<IEnumerable<AlumnoMateria>>> GetMateriasPorAlumno(int idAlumno)
        {
            var relaciones = await _context.AlumnoMaterias
                .Where(am => am.IdAlumno == idAlumno)
                .ToListAsync();

            if (!relaciones.Any())
            {
                return NotFound();
            }

            return relaciones;
        }

        [HttpPost]
        public async Task<ActionResult<AlumnoMateria>> PostAlumnoMateria(AlumnoMateria relacion)
        {
            _context.AlumnoMaterias.Add(relacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMateriasPorAlumno),
                new { idAlumno = relacion.IdAlumno }, relacion);
        }

        [HttpPut("{idAlumno}/{idMateria}")]
        public async Task<IActionResult> PutAlumnoMateria(int idAlumno, int idMateria, AlumnoMateria nuevaRelacion)
        {
            var relacion = await _context.AlumnoMaterias
                .FirstOrDefaultAsync(am => am.IdAlumno == idAlumno && am.IdMateria == idMateria);

            if (relacion == null)
            {
                return NotFound();
            }

            relacion.IdAlumno = nuevaRelacion.IdAlumno;
            relacion.IdMateria = nuevaRelacion.IdMateria;

            _context.Entry(relacion).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

[HttpDelete("alumno/{idAlumno}")]
public async Task<IActionResult> DeleteAlumnoMaterias(int idAlumno)
{
    var relaciones = await _context.AlumnoMaterias
        .Where(am => am.IdAlumno == idAlumno)
        .ToListAsync();

    if (!relaciones.Any())
    {
        return NotFound();
    }

    _context.AlumnoMaterias.RemoveRange(relaciones);
    await _context.SaveChangesAsync();

    return NoContent();
}

    }
}