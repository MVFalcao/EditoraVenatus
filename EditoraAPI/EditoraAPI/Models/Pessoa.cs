using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Pessoa
    {
        [Key]
        public int ID_Pessoa { get; set; }
        public string CPF { get; set; }
        public string Nome { get; set; }
        public float Desconto { get; set; }
        public string Tipo_pessoa { get; set; }
        public string sexo { get; set; }
        public DateTime Data_Nascimento { get; set; }
        public List<Cliente> clientes { get; set; }
    }
}