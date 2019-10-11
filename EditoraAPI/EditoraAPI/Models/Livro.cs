using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Livro
    {
        [Key]
        public int ID_Livro { get; set; }
        public int Numero_Paginas { get; set; }
        public string Tipo_Livro { get; set; }
        public string Descricao { get; set; }
        public string ISBN { get; set; }
        public string Ilustrador { get; set; }
        public string Imagem_URL { get; set; }
        public DateTime Datapublicacao { get; set; }
        public float Preco { get; set; }
        public List<Autor> autors { get; set; }

    }
}