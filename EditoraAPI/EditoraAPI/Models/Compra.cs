
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Compra
    {
        [Key] public int ID_Compra { get; set; }
        [Required] public float Total_Pag { get; set;}
        [Required] public DateTime DataPag { get; set; }
        [JsonIgnore] public virtual List<Cliente> clientes { get; set; }
        [JsonIgnore] public virtual  List<Tipo> tipos { get; set; }
        [Required] [ForeignKey("clientes")] public int id_cliente { get; set; }
        [Required] [ForeignKey("tipos")] public int id_tipo { get; set; }
    }
}