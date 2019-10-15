using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Carrinho
    {
        [Key]
        public int ID_Carrinho { get; set; }
        public List<Compra> compras { get; set; }
        public List<Livro> livros { get; set; }
        public int QuantidadeLivros { get; set; }
        public float PrecoTotal { get; set; }
    }
}