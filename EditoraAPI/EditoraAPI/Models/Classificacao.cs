using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Classificao
    {
        [Key] public int ID_Classificacao { get; set; }
        public virtual List<Livro> livros { get; set; }
        public virtual List<Cliente> clientes { get; set; }
        [Required] public int Nota { get; set; }
        [Required] [StringLength(50)] public string Comentario { get; set; }


    }
}