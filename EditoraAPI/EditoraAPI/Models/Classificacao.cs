using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Classificaco
    {
        [Key] public int ID_Classificacao { get; set; }
        [Required] public int id_cliente { get; set; } //fk
        [Required] public int id_livro { get; set; } //fk
        [Required] public int Nota { get; set; }
        [Required] [StringLength(50)] public string Comentario { get; set; }


    }
}