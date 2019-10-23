using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Livro_Autor
    {
        [Key] public int ID_Livro_Autor { get; set; }
        [Required] public int id_livro { get; set; }
        [Required] public int id_autor { get; set; }

    }
}