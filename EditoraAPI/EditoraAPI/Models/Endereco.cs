using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Endereco
    {
        [Key]
        public int ID_Endereco { get; set;}
        public string CEP { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public List<Autor> autors { get; set; }
        public List<Cliente> clientes { get; set; }

    }
}