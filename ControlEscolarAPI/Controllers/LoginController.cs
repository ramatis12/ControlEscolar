using Microsoft.AspNetCore.Mvc;
using ControlEscolarAPI.Data;
using ControlEscolarAPI.Models;

namespace ControlEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ControlEscolarContext _context;

        public LoginController(ControlEscolarContext context)
        {
            _context = context;
        }

        [HttpGet("validar")]
        public IActionResult Validar(string nombre, string apellidoPaterno)
        {
 Console.WriteLine($"Petición recibida: nombre={nombre}, apellidoPaterno={apellidoPaterno}");

            var alumno = _context.Alumnos
                .FirstOrDefault(a => a.Nombre == nombre && a.ApellidoPaterno == apellidoPaterno);

            if (alumno != null)
                return Ok(new { success = true });
            else
                return Ok(new { success = false, message = "Usuario no existe" });
        }
    }
}
