using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class RedeSocial
    {
        [Key]
        public int ID_RedeSocial { get; set; }
        public string email { get; set; }
        public string Instagram { get; set; }
        public string Twitter { get; set; }
        public string Facebook { get; set; }
        public List<Autor> autors { get; set; }
        public List<Cliente> clientes { get; set; } 
    }
}