using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Telefone
    {
        [Key] public int ID_Telefone { get; set; }
        [Required] [StringLength(15)] public string Tipo_Telefone { get; set; }
        [Required] [StringLength(20)] public string Numero { get; set; }
        [Required] public int id_autor_cliente { get; set; }
    }
}