using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Login
    {
        [Key] public int ID_Login { get; set; }
        [Required] public virtual List<Autor> id_autor { get; set; }

        [Required] public virtual List<Cliente> id_cliente { get; set; }
        [JsonIgnore] [ForeignKey("id_autor")] public int Id_autor { get; set; }
        [JsonIgnore] [ForeignKey("id_cliente")] public int Id_cliente { get; set; }
        [Required] [StringLength(20)] public string Usuario { get; set; }
        [Required] [StringLength(24)] public string Senha { get; set; }
    }
}