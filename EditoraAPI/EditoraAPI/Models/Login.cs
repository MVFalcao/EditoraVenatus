using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Login
    {
        [Key]
        public int ID_Login { get; set; }
        public List<Autor> autors { get; set; }
        public List<Cliente> clientes { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
    }
}