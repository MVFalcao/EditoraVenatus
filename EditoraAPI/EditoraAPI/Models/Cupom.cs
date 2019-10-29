using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Cupom
    {
        [Key] public int ID_Cupom { get; set; }
        [Required] public float Desconto { get; set; }
        [Required] [StringLength(50)] public string Nome { get; set; }
        [Required] public DateTime Data_Ini { get; set; }
        [Required] public DateTime Data_Fim { get; set; }
        public virtual List<Livro> livros { get; set; }
        public virtual List<Pessoa> pessoas { get; set;}
    }
}