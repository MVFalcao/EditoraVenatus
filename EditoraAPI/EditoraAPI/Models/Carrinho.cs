using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Carrinho
    {
        [Key] public int ID_Carrinho { get; set; }
        public int id_compra = -1;//no começo ele eh null e FK
        [JsonIgnore] public virtual List<Compra> compras { get; set; }
        [JsonIgnore] public virtual List<Livro> livros { get; set; }
        [Required] [ForeignKey("compras")] public int id_compras { get; set; }
        [Required] [ForeignKey("livros")] public int id_livros { get; set; }
        [Required] public int QuantidadeLivros { get; set; }
        [Required] public float PrecoTotal { get; set; }
    }
}