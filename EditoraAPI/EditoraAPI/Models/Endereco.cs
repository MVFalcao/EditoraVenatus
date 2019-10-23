using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Endereco
    {
        [Key] public int ID_Endereco { get; set;}
        [Required] [StringLength(10)] public string CEP { get; set; }
        [Required] [StringLength(30)] public string Cidade { get; set; }
        [Required] [StringLength(30)] public string Bairro { get; set; }
        [Required] [StringLength(50)] public string Complemento { get; set; }
        [Required] public int id_autor_cliente { get; set; } //FK de tb_autor OU tb_cliente

    }
}