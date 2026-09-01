using System.ComponentModel.DataAnnotations;

namespace ControlEscolarAPI.Models
{
    public class Materia
    {
        [Key]
        public int IdMateria { get; set; }
        public string Nombre { get; set; }
        public decimal CostoMateria { get; set; }
    }
}