using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Cupom_Pessoa
    {
        [Key] public int ID_Cupom_Pessoa { get; set; }
        [Required] public int id_cupom { get; set; }
        [Required] public int id_pessoa { get; set; }

    }
}