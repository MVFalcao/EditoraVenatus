using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [JsonIgnore] public virtual List<Livro> livros { get; set; }
        [JsonIgnore] public virtual List<Pessoa> pessoas { get; set;}
        [Required] [ForeignKey("livros")] public int Id_livro { get; set; }
        [Required] [ForeignKey("pessoas")] public int Id_pessoa { get; set; }
    }
}