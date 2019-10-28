using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Autor
    {
        [Key] public int ID_Autor { get; set; }
        [Required] [StringLength(15)] public string CPF { get; set; }
        [Required] [StringLength(100)] public string Nome { get; set; }
        [Required] public List<Livro> livros { get; set; }
    }
}