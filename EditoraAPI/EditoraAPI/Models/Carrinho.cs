using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Carrinho
    {
        [Key] public int ID_Carrinho { get; set; }
        public int id_compra = -1;//no começo ele eh null e FK
        [Required] public int id_livro { get; set; } //FK
        [Required] public int QuantidadeLivros { get; set; }
        [Required] public float PrecoTotal { get; set; }
    }
}