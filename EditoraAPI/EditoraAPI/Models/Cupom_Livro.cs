using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Cupom_Livro
    {
        [Key] public int ID_Cupom_Livro { get; set; }
        [Required] public int id_cupom { get; set; } //fk
        [Required] public int id_livro { get; set; } //fk
    }
}