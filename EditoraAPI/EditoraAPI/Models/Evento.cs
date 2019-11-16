using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Evento
    {
        [Key] public int ID_Evento { get; set; }
        [Required] public string Imagem_URL { get; set; }
        [Required] public string Titulo { get; set; }
        [Required] public string Descrição { get; set; }
        [Required] public DateTime Data_Evento { get; set; }
        [ForeignKey("Id_escola")] public int Esc { get; set; }
        [ForeignKey("Id_livraria")] public int Livraria { get; set; }
        [JsonIgnore] public virtual List<Escola> Id_escola { get; set; }
        [JsonIgnore] public virtual List<Livraria> Id_livraria { get; set; }
    }
}