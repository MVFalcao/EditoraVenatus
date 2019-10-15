using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Livraria
    {
        [Key]
        public int ID_Livraria { get; set; }
        public List<Cliente> clientes { get; set; }
        public string CNPJ { get; set; }
        public string Tipo_Consignacao { get; set; }
        public string Nome { get; set; }
    }
}