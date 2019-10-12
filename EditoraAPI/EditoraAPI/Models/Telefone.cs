using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Telefone
    {
        [Key]
        public int ID_Telefone { get; set; }
        public string Tipo_Telefone { get; set; }
        public string Numero { get; set; }
        public List<Autor> autors { get; set; }
        public List<Cliente> clientes { get; set; }
    }
}