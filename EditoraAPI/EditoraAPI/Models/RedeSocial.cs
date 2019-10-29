using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class RedeSocial
    {
        [Key] public int ID_RedeSocial { get; set; }
        [StringLength(20)] public string email { get; set; } = null;
        [StringLength(20)] public string Instagram { get; set; } = null;
        [StringLength(20)] public string Twitter { get; set; } = null;
        [StringLength(20)] public string Facebook { get; set; } = null;
        [JsonIgnore] public virtual List<Autor> id_autor { get; set; }
        [JsonIgnore] public virtual List<Cliente> id_cliente { get; set; }
        [Required] [ForeignKey("id_autor")] public int Id_aut { get; set; }
        [Required] [ForeignKey("id_cliente")] public int Id_cli { get; set; }
    }
}