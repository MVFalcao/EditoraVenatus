namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Banco21 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.LivroAutors", newName: "AutorLivroes");
            RenameTable(name: "dbo.CupomLivroes", newName: "LivroCupoms");
            RenameTable(name: "dbo.PessoaCupoms", newName: "CupomPessoas");
            DropPrimaryKey("dbo.AutorLivroes");
            DropPrimaryKey("dbo.LivroCupoms");
            DropPrimaryKey("dbo.CupomPessoas");
            AddColumn("dbo.Autors", "Id_livros", c => c.Int(nullable: false));
            AddColumn("dbo.Autors", "Telefone_ID_Telefone", c => c.Int());
            AddColumn("dbo.Livroes", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Livroes", "Id_cupom", c => c.Int(nullable: false));
            AddColumn("dbo.Cupoms", "Id_livro", c => c.Int(nullable: false));
            AddColumn("dbo.Cupoms", "Id_pessoa", c => c.Int(nullable: false));
            AddColumn("dbo.Pessoas", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Pessoas", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Clientes", "Telefone_ID_Telefone", c => c.Int());
            AddColumn("dbo.Enderecoes", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Enderecoes", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.RedeSocials", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.RedeSocials", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Telefones", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Telefones", "Id_cliente", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.AutorLivroes", new[] { "Autor_ID_Autor", "Livro_ID_Livro" });
            AddPrimaryKey("dbo.LivroCupoms", new[] { "Livro_ID_Livro", "Cupom_ID_Cupom" });
            AddPrimaryKey("dbo.CupomPessoas", new[] { "Cupom_ID_Cupom", "Pessoa_ID_Pessoa" });
            CreateIndex("dbo.Autors", "Telefone_ID_Telefone");
            CreateIndex("dbo.Clientes", "Telefone_ID_Telefone");
            AddForeignKey("dbo.Autors", "Telefone_ID_Telefone", "dbo.Telefones", "ID_Telefone");
            AddForeignKey("dbo.Clientes", "Telefone_ID_Telefone", "dbo.Telefones", "ID_Telefone");
            DropColumn("dbo.Telefones", "id_autor_cliente");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Telefones", "id_autor_cliente", c => c.Int(nullable: false));
            DropForeignKey("dbo.Clientes", "Telefone_ID_Telefone", "dbo.Telefones");
            DropForeignKey("dbo.Autors", "Telefone_ID_Telefone", "dbo.Telefones");
            DropIndex("dbo.Clientes", new[] { "Telefone_ID_Telefone" });
            DropIndex("dbo.Autors", new[] { "Telefone_ID_Telefone" });
            DropPrimaryKey("dbo.CupomPessoas");
            DropPrimaryKey("dbo.LivroCupoms");
            DropPrimaryKey("dbo.AutorLivroes");
            DropColumn("dbo.Telefones", "Id_cliente");
            DropColumn("dbo.Telefones", "Id_autor");
            DropColumn("dbo.RedeSocials", "Id_cliente");
            DropColumn("dbo.RedeSocials", "Id_autor");
            DropColumn("dbo.Enderecoes", "Id_cliente");
            DropColumn("dbo.Enderecoes", "Id_autor");
            DropColumn("dbo.Clientes", "Telefone_ID_Telefone");
            DropColumn("dbo.Pessoas", "Id_cliente");
            DropColumn("dbo.Pessoas", "Id_autor");
            DropColumn("dbo.Cupoms", "Id_pessoa");
            DropColumn("dbo.Cupoms", "Id_livro");
            DropColumn("dbo.Livroes", "Id_cupom");
            DropColumn("dbo.Livroes", "Id_autor");
            DropColumn("dbo.Autors", "Telefone_ID_Telefone");
            DropColumn("dbo.Autors", "Id_livros");
            AddPrimaryKey("dbo.CupomPessoas", new[] { "Pessoa_ID_Pessoa", "Cupom_ID_Cupom" });
            AddPrimaryKey("dbo.LivroCupoms", new[] { "Cupom_ID_Cupom", "Livro_ID_Livro" });
            AddPrimaryKey("dbo.AutorLivroes", new[] { "Livro_ID_Livro", "Autor_ID_Autor" });
            RenameTable(name: "dbo.CupomPessoas", newName: "PessoaCupoms");
            RenameTable(name: "dbo.LivroCupoms", newName: "CupomLivroes");
            RenameTable(name: "dbo.AutorLivroes", newName: "LivroAutors");
        }
    }
}
