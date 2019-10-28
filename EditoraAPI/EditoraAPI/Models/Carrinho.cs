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
        public List<Compra> compras { get; set; }
        [Required] public List<Livro> livros { get; set; }
        [Required] public int QuantidadeLivros { get; set; }
        [Required] public float PrecoTotal { get; set; }
    }
}