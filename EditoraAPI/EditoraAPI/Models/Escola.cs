using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Escola
    {
        [Key] public int ID_Escola { get; set; }
        [Required] [StringLength(50)] public string Nome_Instituicao { get; set; }
        [Required] [StringLength(20)] public string Responsavel { get; set; } //Profissão do Responsável
        [Required] [StringLength(100)] public string Livro_Adotado { get; set; }
        [Required] [StringLength(50)] public string Serie_Adotada { get; set; }
        [Required] public DateTime data_Adotada { get; set; }
    }
}