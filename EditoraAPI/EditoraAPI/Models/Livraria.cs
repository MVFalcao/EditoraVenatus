using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Livraria
    {
        [Key] public int ID_Livraria { get; set; }
        [Required] public int id_cliente { get; set; } // fk
        [Required] [StringLength(15)] public string CNPJ { get; set; }
        [Required] [StringLength(50)] public string Tipo_Consignacao { get; set; }
        [Required] [StringLength(50)] public string Nome { get; set; }
    }
}