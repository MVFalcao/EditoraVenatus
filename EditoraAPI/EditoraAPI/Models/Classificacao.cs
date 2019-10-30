using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Classificao
    {
        [Key] public int ID_Classificacao { get; set; }
        [JsonIgnore] public virtual List<Livro> livros { get; set; }
        [JsonIgnore] public virtual List<Cliente> clientes { get; set; }
        [Required] public int Nota { get; set; }
        [Required] [StringLength(50)] public string Comentario { get; set; }
        [Required] [ForeignKey("clientes")] public int id_cliente { get; set; }
        [Required] [ForeignKey("livros")] public int id_livros { get; set; }


    }
}