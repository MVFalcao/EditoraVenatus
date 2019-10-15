using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Escola
    {
        [Key]
        public int ID_Escola { get; set; }
        public string Nome_Instituicao { get; set; }
        public string Responsavel { get; set; }
        public string Livro_Adotado { get; set; }
        public string Serie_Adotada { get; set; }
        public DateTime data_Adotada { get; set; }
    }
}