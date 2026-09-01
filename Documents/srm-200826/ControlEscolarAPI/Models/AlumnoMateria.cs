using System.ComponentModel.DataAnnotations;

namespace ControlEscolarAPI.Models
{
    public class AlumnoMateria
    {
        [Key]
        public int Id { get; set; }
        public int IdAlumno { get; set; }
        public int IdMateria { get; set; }
    }
}