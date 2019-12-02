
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
        [Required] public string NomeCli { get; set; }
        [Required] public float Total_Pag { get; set;}
        [Required] public DateTime DataPag { get; set; }
    }
}