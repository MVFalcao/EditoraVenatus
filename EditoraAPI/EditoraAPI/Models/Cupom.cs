using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Cupom
    {
        [Key]
        public int ID_Cupom { get; set; }
        public float Desconto { get; set; }
        public string Nome { get; set; }
        public DateTime Data_Ini { get; set; }
        public DateTime Data_Fim { get; set; }
        public List<Livro> livros { get; set; }
        public List<Pessoa> pessoas { get; set; }
    }
}