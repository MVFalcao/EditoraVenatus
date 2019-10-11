using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Cliente
    {
        [Key]
        public int ID_Cliente { get; set; }

    }
}