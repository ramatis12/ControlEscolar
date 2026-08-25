using System.ComponentModel.DataAnnotations;

namespace ControlEscolarAPI.Models
{
    public class Alumno
    {
        [Key]
        public int IdAlumno { get; set; }

        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
    }
}
