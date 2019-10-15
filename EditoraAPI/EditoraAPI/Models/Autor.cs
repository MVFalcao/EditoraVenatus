using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Autor
    {
        [Key]
        public int ID_Autor { get; set; }
        public string CPF { get; set; }
        public string Nome { get; set; }
        public List<Autor> autors { get; set; }
        public List<Cupom> cupoms { get; set; }
    }
}