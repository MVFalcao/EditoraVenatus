using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Estoque
    {
        [Key] public int ID_Estoque { get; set; }
        [Required] public int quantidade { get; set; }
        [Required] public int id_livro { get; set; } //FK
    }
}