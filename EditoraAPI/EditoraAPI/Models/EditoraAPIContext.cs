using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EditoraAPI.Models
{
    public class EditoraAPIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public EditoraAPIContext() : base("name=EditoraAPI")
        {
        }

        public System.Data.Entity.DbSet<EditoraAPI.Models.Autor> autors { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Carrinho> Carrinhos { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Classificao> classificaos { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Cliente> clientes { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Compra> compras { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Cupom> cupoms { get; set; }

        public System.Data.Entity.DbSet<EditoraAPI.Models.Endereco> enderecos { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Escola> escolas { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Estoque> estoques { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Livraria> livrarias { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Livro> livros { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Login> logins { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.Pessoa> pessoas { get; set; }
        public System.Data.Entity.DbSet<EditoraAPI.Models.RedeSocial> redeSocials { get; set; }

        public System.Data.Entity.DbSet<EditoraAPI.Models.Telefone> telefones { get; set; }

        public System.Data.Entity.DbSet<EditoraAPI.Models.Tipo> tipos { get; set; }
    }
}
