namespace EditoraAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class BancoEditora : DbContext
    {
        // Your context has been configured to use a 'BancoEditora' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'EditoraAPI.Models.BancoEditora' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'BancoEditora' 
        // connection string in the application configuration file.
        public BancoEditora()
            : base("name=BancoEditora")
        {
        }
        public virtual DbSet<Autor> Autors { get; set; }
        public virtual DbSet<Carrinho> Carrinhos { get; set; }
        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Compra> Compras { get; set; }
        public virtual DbSet<Endereco> Enderecos { get; set; }
        public virtual DbSet<Cupom> Cupoms { get; set; }
        public virtual DbSet<Escola> Escolas { get; set; }
        public virtual DbSet<Estoque> Estoques { get; set; }
        public virtual DbSet<Livraria> Livrarias { get; set; }
        public virtual DbSet<Livro> Livros { get; set; }
        public virtual DbSet<Pessoa> Pessoas { get; set; }
        public virtual DbSet<RedeSocial> RedeSocials { get; set; }
        public virtual DbSet<Telefone> Telefones { get; set; }
        public virtual DbSet<Tipo> Tipos { get; set; }
        public virtual DbSet<Login> Logins { get; set; }


        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}