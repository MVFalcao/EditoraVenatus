using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Estoque
    {
        [Key]
        public int ID_Estoque { get; set; }
        public int quantidade { get; set; }
        List<Livro> livros { get; set; }
    }
}