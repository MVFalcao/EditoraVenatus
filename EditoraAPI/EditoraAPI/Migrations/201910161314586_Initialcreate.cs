namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialcreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Autors",
                c => new
                    {
                        ID_Autor = c.Int(nullable: false, identity: true),
                        CPF = c.String(),
                        Nome = c.String(),
                        Autor_ID_Autor = c.Int(),
                        Livro_ID_Livro = c.Int(),
                        Endereco_ID_Endereco = c.Int(),
                        Login_ID_Login = c.Int(),
                        RedeSocial_ID_RedeSocial = c.Int(),
                        Telefone_ID_Telefone = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Autor)
                .ForeignKey("dbo.Autors", t => t.Autor_ID_Autor)
                .ForeignKey("dbo.Livroes", t => t.Livro_ID_Livro)
                .ForeignKey("dbo.Enderecoes", t => t.Endereco_ID_Endereco)
                .ForeignKey("dbo.Logins", t => t.Login_ID_Login)
                .ForeignKey("dbo.RedeSocials", t => t.RedeSocial_ID_RedeSocial)
                .ForeignKey("dbo.Telefones", t => t.Telefone_ID_Telefone)
                .Index(t => t.Autor_ID_Autor)
                .Index(t => t.Livro_ID_Livro)
                .Index(t => t.Endereco_ID_Endereco)
                .Index(t => t.Login_ID_Login)
                .Index(t => t.RedeSocial_ID_RedeSocial)
                .Index(t => t.Telefone_ID_Telefone);
            
            CreateTable(
                "dbo.Cupoms",
                c => new
                    {
                        ID_Cupom = c.Int(nullable: false, identity: true),
                        Desconto = c.Single(nullable: false),
                        Nome = c.String(),
                        Data_Ini = c.DateTime(nullable: false),
                        Data_Fim = c.DateTime(nullable: false),
                        Autor_ID_Autor = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Cupom)
                .ForeignKey("dbo.Autors", t => t.Autor_ID_Autor)
                .Index(t => t.Autor_ID_Autor);
            
            CreateTable(
                "dbo.Livroes",
                c => new
                    {
                        ID_Livro = c.Int(nullable: false, identity: true),
                        Titulo = c.String(),
                        Numero_Paginas = c.Int(nullable: false),
                        Categoria = c.String(),
                        Descricao = c.String(),
                        ISBN = c.String(),
                        Ilustrador = c.String(),
                        Imagem_URL = c.String(),
                        Datapublicacao = c.DateTime(nullable: false),
                        Preco = c.Single(nullable: false),
                        Idioma = c.String(),
                        Formato = c.String(),
                        SubTitulo = c.String(),
                        Sinopse = c.String(),
                        Cupom_ID_Cupom = c.Int(),
                        Carrinho_ID_Carrinho = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Livro)
                .ForeignKey("dbo.Cupoms", t => t.Cupom_ID_Cupom)
                .ForeignKey("dbo.Carrinhoes", t => t.Carrinho_ID_Carrinho)
                .Index(t => t.Cupom_ID_Cupom)
                .Index(t => t.Carrinho_ID_Carrinho);
            
            CreateTable(
                "dbo.Pessoas",
                c => new
                    {
                        ID_Pessoa = c.Int(nullable: false, identity: true),
                        CPF = c.String(),
                        Nome = c.String(),
                        Desconto = c.Single(nullable: false),
                        Tipo_pessoa = c.String(),
                        sexo = c.String(),
                        Data_Nascimento = c.DateTime(nullable: false),
                        Cupom_ID_Cupom = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Pessoa)
                .ForeignKey("dbo.Cupoms", t => t.Cupom_ID_Cupom)
                .Index(t => t.Cupom_ID_Cupom);
            
            CreateTable(
                "dbo.Clientes",
                c => new
                    {
                        ID_Cliente = c.Int(nullable: false, identity: true),
                        Pessoa_ID_Pessoa = c.Int(),
                        Compra_ID_Compra = c.Int(),
                        Endereco_ID_Endereco = c.Int(),
                        Livraria_ID_Livraria = c.Int(),
                        Login_ID_Login = c.Int(),
                        RedeSocial_ID_RedeSocial = c.Int(),
                        Telefone_ID_Telefone = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Cliente)
                .ForeignKey("dbo.Pessoas", t => t.Pessoa_ID_Pessoa)
                .ForeignKey("dbo.Compras", t => t.Compra_ID_Compra)
                .ForeignKey("dbo.Enderecoes", t => t.Endereco_ID_Endereco)
                .ForeignKey("dbo.Livrarias", t => t.Livraria_ID_Livraria)
                .ForeignKey("dbo.Logins", t => t.Login_ID_Login)
                .ForeignKey("dbo.RedeSocials", t => t.RedeSocial_ID_RedeSocial)
                .ForeignKey("dbo.Telefones", t => t.Telefone_ID_Telefone)
                .Index(t => t.Pessoa_ID_Pessoa)
                .Index(t => t.Compra_ID_Compra)
                .Index(t => t.Endereco_ID_Endereco)
                .Index(t => t.Livraria_ID_Livraria)
                .Index(t => t.Login_ID_Login)
                .Index(t => t.RedeSocial_ID_RedeSocial)
                .Index(t => t.Telefone_ID_Telefone);
            
            CreateTable(
                "dbo.Carrinhoes",
                c => new
                    {
                        ID_Carrinho = c.Int(nullable: false, identity: true),
                        QuantidadeLivros = c.Int(nullable: false),
                        PrecoTotal = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Carrinho);
            
            CreateTable(
                "dbo.Compras",
                c => new
                    {
                        ID_Compra = c.Int(nullable: false, identity: true),
                        Total_Pag = c.Single(nullable: false),
                        DataPag = c.DateTime(nullable: false),
                        Carrinho_ID_Carrinho = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Compra)
                .ForeignKey("dbo.Carrinhoes", t => t.Carrinho_ID_Carrinho)
                .Index(t => t.Carrinho_ID_Carrinho);
            
            CreateTable(
                "dbo.Tipoes",
                c => new
                    {
                        ID_Tipo = c.Int(nullable: false, identity: true),
                        Descricao = c.String(),
                        Compra_ID_Compra = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Tipo)
                .ForeignKey("dbo.Compras", t => t.Compra_ID_Compra)
                .Index(t => t.Compra_ID_Compra);
            
            CreateTable(
                "dbo.Enderecoes",
                c => new
                    {
                        ID_Endereco = c.Int(nullable: false, identity: true),
                        CEP = c.String(),
                        Cidade = c.String(),
                        Bairro = c.String(),
                        Complemento = c.String(),
                    })
                .PrimaryKey(t => t.ID_Endereco);
            
            CreateTable(
                "dbo.Escolas",
                c => new
                    {
                        ID_Escola = c.Int(nullable: false, identity: true),
                        Nome_Instituicao = c.String(),
                        Responsavel = c.String(),
                        Livro_Adotado = c.String(),
                        Serie_Adotada = c.String(),
                        data_Adotada = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Escola);
            
            CreateTable(
                "dbo.Estoques",
                c => new
                    {
                        ID_Estoque = c.Int(nullable: false, identity: true),
                        quantidade = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Estoque);
            
            CreateTable(
                "dbo.Livrarias",
                c => new
                    {
                        ID_Livraria = c.Int(nullable: false, identity: true),
                        CNPJ = c.String(),
                        Tipo_Consignacao = c.String(),
                        Nome = c.String(),
                    })
                .PrimaryKey(t => t.ID_Livraria);
            
            CreateTable(
                "dbo.Logins",
                c => new
                    {
                        ID_Login = c.Int(nullable: false, identity: true),
                        Usuario = c.String(),
                        Senha = c.String(),
                    })
                .PrimaryKey(t => t.ID_Login);
            
            CreateTable(
                "dbo.RedeSocials",
                c => new
                    {
                        ID_RedeSocial = c.Int(nullable: false, identity: true),
                        email = c.String(),
                        Instagram = c.String(),
                        Twitter = c.String(),
                        Facebook = c.String(),
                    })
                .PrimaryKey(t => t.ID_RedeSocial);
            
            CreateTable(
                "dbo.Telefones",
                c => new
                    {
                        ID_Telefone = c.Int(nullable: false, identity: true),
                        Tipo_Telefone = c.String(),
                        Numero = c.String(),
                    })
                .PrimaryKey(t => t.ID_Telefone);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Clientes", "Telefone_ID_Telefone", "dbo.Telefones");
            DropForeignKey("dbo.Autors", "Telefone_ID_Telefone", "dbo.Telefones");
            DropForeignKey("dbo.Clientes", "RedeSocial_ID_RedeSocial", "dbo.RedeSocials");
            DropForeignKey("dbo.Autors", "RedeSocial_ID_RedeSocial", "dbo.RedeSocials");
            DropForeignKey("dbo.Clientes", "Login_ID_Login", "dbo.Logins");
            DropForeignKey("dbo.Autors", "Login_ID_Login", "dbo.Logins");
            DropForeignKey("dbo.Clientes", "Livraria_ID_Livraria", "dbo.Livrarias");
            DropForeignKey("dbo.Clientes", "Endereco_ID_Endereco", "dbo.Enderecoes");
            DropForeignKey("dbo.Autors", "Endereco_ID_Endereco", "dbo.Enderecoes");
            DropForeignKey("dbo.Livroes", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropForeignKey("dbo.Compras", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropForeignKey("dbo.Tipoes", "Compra_ID_Compra", "dbo.Compras");
            DropForeignKey("dbo.Clientes", "Compra_ID_Compra", "dbo.Compras");
            DropForeignKey("dbo.Cupoms", "Autor_ID_Autor", "dbo.Autors");
            DropForeignKey("dbo.Pessoas", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropForeignKey("dbo.Clientes", "Pessoa_ID_Pessoa", "dbo.Pessoas");
            DropForeignKey("dbo.Livroes", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropForeignKey("dbo.Autors", "Livro_ID_Livro", "dbo.Livroes");
            DropForeignKey("dbo.Autors", "Autor_ID_Autor", "dbo.Autors");
            DropIndex("dbo.Tipoes", new[] { "Compra_ID_Compra" });
            DropIndex("dbo.Compras", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.Clientes", new[] { "Telefone_ID_Telefone" });
            DropIndex("dbo.Clientes", new[] { "RedeSocial_ID_RedeSocial" });
            DropIndex("dbo.Clientes", new[] { "Login_ID_Login" });
            DropIndex("dbo.Clientes", new[] { "Livraria_ID_Livraria" });
            DropIndex("dbo.Clientes", new[] { "Endereco_ID_Endereco" });
            DropIndex("dbo.Clientes", new[] { "Compra_ID_Compra" });
            DropIndex("dbo.Clientes", new[] { "Pessoa_ID_Pessoa" });
            DropIndex("dbo.Pessoas", new[] { "Cupom_ID_Cupom" });
            DropIndex("dbo.Livroes", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.Livroes", new[] { "Cupom_ID_Cupom" });
            DropIndex("dbo.Cupoms", new[] { "Autor_ID_Autor" });
            DropIndex("dbo.Autors", new[] { "Telefone_ID_Telefone" });
            DropIndex("dbo.Autors", new[] { "RedeSocial_ID_RedeSocial" });
            DropIndex("dbo.Autors", new[] { "Login_ID_Login" });
            DropIndex("dbo.Autors", new[] { "Endereco_ID_Endereco" });
            DropIndex("dbo.Autors", new[] { "Livro_ID_Livro" });
            DropIndex("dbo.Autors", new[] { "Autor_ID_Autor" });
            DropTable("dbo.Telefones");
            DropTable("dbo.RedeSocials");
            DropTable("dbo.Logins");
            DropTable("dbo.Livrarias");
            DropTable("dbo.Estoques");
            DropTable("dbo.Escolas");
            DropTable("dbo.Enderecoes");
            DropTable("dbo.Tipoes");
            DropTable("dbo.Compras");
            DropTable("dbo.Carrinhoes");
            DropTable("dbo.Clientes");
            DropTable("dbo.Pessoas");
            DropTable("dbo.Livroes");
            DropTable("dbo.Cupoms");
            DropTable("dbo.Autors");
        }
    }
}
