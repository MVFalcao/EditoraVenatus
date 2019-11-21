using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Endereco
    {
        [Key] public int ID_Endereco { get; set;}
        public string Nome_Proprietario { get; set; }
        [Required] [StringLength(10)] public string CEP { get; set; }
        [Required] public string Logradouro { get; set; }
        [Required] [StringLength(10)] public string Numero { get; set; }
        [Required] [StringLength(30)] public string Cidade { get; set; }
        [Required] [StringLength(30)] public string Bairro { get; set; }
        [Required] [StringLength(50)] public string Complemento { get; set; }
        [JsonIgnore] public virtual List<Autor> id_autor { get; set; }
        [ForeignKey("id_autor")] public int autor { get; set; }
        [ForeignKey("id_cliente")] public int cliente { get; set; }
        [JsonIgnore] public virtual List<Cliente> id_cliente { get; set; } //FK de tb_autor OU tb_cliente

    }
}