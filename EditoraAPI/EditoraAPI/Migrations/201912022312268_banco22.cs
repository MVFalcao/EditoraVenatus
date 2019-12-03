namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco22 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.LivroCupoms", "Livro_ID_Livro", "dbo.Livroes");
            DropForeignKey("dbo.LivroCupoms", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropForeignKey("dbo.Compras", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropForeignKey("dbo.Livroes", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropIndex("dbo.Livroes", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.Compras", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.LivroCupoms", new[] { "Livro_ID_Livro" });
            DropIndex("dbo.LivroCupoms", new[] { "Cupom_ID_Cupom" });
            AddColumn("dbo.Livroes", "Cupom_ID_Cupom", c => c.Int());
            AddColumn("dbo.Cupoms", "Botao_URL", c => c.String());
            AddColumn("dbo.Clientes", "Escola_ID_Escola", c => c.Int());
            AddColumn("dbo.Escolas", "CNPJ", c => c.String(nullable: false));
            AddColumn("dbo.Escolas", "id_cliente", c => c.Int(nullable: false));
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(maxLength: 50));
            CreateIndex("dbo.Livroes", "Cupom_ID_Cupom");
            CreateIndex("dbo.Clientes", "Escola_ID_Escola");
            AddForeignKey("dbo.Livroes", "Cupom_ID_Cupom", "dbo.Cupoms", "ID_Cupom");
            AddForeignKey("dbo.Clientes", "Escola_ID_Escola", "dbo.Escolas", "ID_Escola");
            DropColumn("dbo.Livroes", "Id_cupom");
            DropColumn("dbo.Livroes", "Carrinho_ID_Carrinho");
            DropColumn("dbo.Compras", "Carrinho_ID_Carrinho");
            DropTable("dbo.Carrinhoes");
            DropTable("dbo.LivroCupoms");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.LivroCupoms",
                c => new
                    {
                        Livro_ID_Livro = c.Int(nullable: false),
                        Cupom_ID_Cupom = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Livro_ID_Livro, t.Cupom_ID_Cupom });
            
            CreateTable(
                "dbo.Carrinhoes",
                c => new
                    {
                        ID_Carrinho = c.Int(nullable: false, identity: true),
                        id_compras = c.Int(nullable: false),
                        id_livros = c.Int(nullable: false),
                        QuantidadeLivros = c.Int(nullable: false),
                        PrecoTotal = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Carrinho);
            
            AddColumn("dbo.Compras", "Carrinho_ID_Carrinho", c => c.Int());
            AddColumn("dbo.Livroes", "Carrinho_ID_Carrinho", c => c.Int());
            AddColumn("dbo.Livroes", "Id_cupom", c => c.Int(nullable: false));
            DropForeignKey("dbo.Clientes", "Escola_ID_Escola", "dbo.Escolas");
            DropForeignKey("dbo.Livroes", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropIndex("dbo.Clientes", new[] { "Escola_ID_Escola" });
            DropIndex("dbo.Livroes", new[] { "Cupom_ID_Cupom" });
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(nullable: false, maxLength: 50));
            DropColumn("dbo.Escolas", "id_cliente");
            DropColumn("dbo.Escolas", "CNPJ");
            DropColumn("dbo.Clientes", "Escola_ID_Escola");
            DropColumn("dbo.Cupoms", "Botao_URL");
            DropColumn("dbo.Livroes", "Cupom_ID_Cupom");
            CreateIndex("dbo.LivroCupoms", "Cupom_ID_Cupom");
            CreateIndex("dbo.LivroCupoms", "Livro_ID_Livro");
            CreateIndex("dbo.Compras", "Carrinho_ID_Carrinho");
            CreateIndex("dbo.Livroes", "Carrinho_ID_Carrinho");
            AddForeignKey("dbo.Livroes", "Carrinho_ID_Carrinho", "dbo.Carrinhoes", "ID_Carrinho");
            AddForeignKey("dbo.Compras", "Carrinho_ID_Carrinho", "dbo.Carrinhoes", "ID_Carrinho");
            AddForeignKey("dbo.LivroCupoms", "Cupom_ID_Cupom", "dbo.Cupoms", "ID_Cupom", cascadeDelete: true);
            AddForeignKey("dbo.LivroCupoms", "Livro_ID_Livro", "dbo.Livroes", "ID_Livro", cascadeDelete: true);
        }
    }
}
