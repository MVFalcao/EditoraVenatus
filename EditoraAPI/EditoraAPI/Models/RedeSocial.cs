using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required] public List<Autor> id_autor { get; set; }
        [Required] public List<Cliente> id_cliente { get; set; }
    }
}