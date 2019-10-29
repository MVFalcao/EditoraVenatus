using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Pessoa
    {
        [Key] public int ID_Pessoa { get; set; }
        [Required] [StringLength(15)] public string CPF { get; set; }
        [Required] [StringLength(50)] public string Nome { get; set; }
        [Required] public Boolean Desconto { get; set; }
        [Required] [StringLength(20)] public string Tipo_pessoa { get; set; }
        [Required] [StringLength(1)] public string sexo { get; set; }
        [Required] public DateTime Data_Nascimento { get; set; }
        [JsonIgnore] public List<Cliente> id_cliente { get; set; } //FK
        [JsonIgnore] public virtual List<Cupom> cupoms { get; set; }
        [Required] [ForeignKey("cupoms")] public int Id_cup { get; set; }
        [Required] [ForeignKey("id_cliente")] public int Id_cli { get; set; }
    }
}