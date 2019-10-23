﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class Livro
    {
        [Key] public int ID_Livro { get; set; }
        [Required] [StringLength(100)] public string Titulo { get; set; }
        [Required] public int Numero_Paginas { get; set; }
        [Required] [StringLength(20)] public string Categoria { get; set; }
        [Required] [StringLength(50)] public string Descricao { get; set; }
        [Required] [StringLength(20)] public string ISBN { get; set; }
        [Required] [StringLength(50)] public string Ilustrador { get; set; }
        [Required] public string Imagem_URL { get; set; }
        [Required] public DateTime Datapublicacao { get; set; }
        [Required] public float Preco { get; set; }
        [Required] [StringLength(20)] public string Idioma { get; set; }
        [Required] [StringLength(20)] public string Formato { get; set; }
        [Required] [StringLength(50)] public string SubTitulo { get; set; }
        [Required] public string Sinopse { get; set; }
        [Required] public List<Autor> id_autore { get; set; }
        [Required] [StringLength(10)] public string Classificacao_Indicativa { get; set; } //idade(int) ou livre (string)

    }
}