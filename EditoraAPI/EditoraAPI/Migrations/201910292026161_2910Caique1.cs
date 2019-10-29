namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2910Caique1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pessoas", "Id_cup", c => c.Int(nullable: false));
            AddColumn("dbo.Pessoas", "Id_cli", c => c.Int(nullable: false));
            AddColumn("dbo.Carrinhoes", "id_compras", c => c.Int(nullable: false));
            AddColumn("dbo.Carrinhoes", "id_livros", c => c.Int(nullable: false));
            AddColumn("dbo.Compras", "id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Compras", "id_tipo", c => c.Int(nullable: false));
            AddColumn("dbo.Classificaos", "id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Classificaos", "id_livros", c => c.Int(nullable: false));
            AddColumn("dbo.Enderecoes", "autor", c => c.Int(nullable: false));
            AddColumn("dbo.Enderecoes", "cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Estoques", "livro", c => c.Int(nullable: false));
            AddColumn("dbo.Livrarias", "cliente", c => c.Int(nullable: false));
            AddColumn("dbo.RedeSocials", "Id_aut", c => c.Int(nullable: false));
            AddColumn("dbo.RedeSocials", "Id_cli", c => c.Int(nullable: false));
            DropColumn("dbo.Pessoas", "Id_autor");
            DropColumn("dbo.Pessoas", "Id_cliente");
            DropColumn("dbo.Enderecoes", "Id_autor");
            DropColumn("dbo.Enderecoes", "Id_cliente");
            DropColumn("dbo.RedeSocials", "Id_autor");
            DropColumn("dbo.RedeSocials", "Id_cliente");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RedeSocials", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.RedeSocials", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Enderecoes", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Enderecoes", "Id_autor", c => c.Int(nullable: false));
            AddColumn("dbo.Pessoas", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Pessoas", "Id_autor", c => c.Int(nullable: false));
            DropColumn("dbo.RedeSocials", "Id_cli");
            DropColumn("dbo.RedeSocials", "Id_aut");
            DropColumn("dbo.Livrarias", "cliente");
            DropColumn("dbo.Estoques", "livro");
            DropColumn("dbo.Enderecoes", "cliente");
            DropColumn("dbo.Enderecoes", "autor");
            DropColumn("dbo.Classificaos", "id_livros");
            DropColumn("dbo.Classificaos", "id_cliente");
            DropColumn("dbo.Compras", "id_tipo");
            DropColumn("dbo.Compras", "id_cliente");
            DropColumn("dbo.Carrinhoes", "id_livros");
            DropColumn("dbo.Carrinhoes", "id_compras");
            DropColumn("dbo.Pessoas", "Id_cli");
            DropColumn("dbo.Pessoas", "Id_cup");
        }
    }
}
