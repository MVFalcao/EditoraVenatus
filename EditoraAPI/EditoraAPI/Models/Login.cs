using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Login
    {
        [Key] public int ID_Login { get; set; }
        [Required] public int id_autor_cliente { get; set; }
        [Required] [StringLength(20)] public string Usuario { get; set; }
        [Required] [StringLength(24)] public string Senha { get; set; }
    }
}