using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Estoque
    {
        [Key] public int ID_Estoque { get; set; }
        [Required] public int quantidade { get; set; }
        [JsonIgnore] public virtual List<Livro> id_livro { get; set; } //FK
        [Required] [ForeignKey("id_livro")] public int livro { get; set; }
    }
}