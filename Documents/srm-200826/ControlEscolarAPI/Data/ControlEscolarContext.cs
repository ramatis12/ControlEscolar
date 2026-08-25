using Microsoft.EntityFrameworkCore;
using ControlEscolarAPI.Models;

namespace ControlEscolarAPI.Data
{
    public class ControlEscolarContext : DbContext
    {
        public ControlEscolarContext(DbContextOptions<ControlEscolarContext> options)
            : base(options) { }

        public DbSet<Alumno> Alumnos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<AlumnoMateria> AlumnoMaterias { get; set; }
    }
}
