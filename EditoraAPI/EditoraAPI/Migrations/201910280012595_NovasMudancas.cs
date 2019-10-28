namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NovasMudancas : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Autors",
                c => new
                    {
                        ID_Autor = c.Int(nullable: false, identity: true),
                        CPF = c.String(nullable: false, maxLength: 15),
                        Nome = c.String(nullable: false, maxLength: 100),
                        Endereco_ID_Endereco = c.Int(),
                        Login_ID_Login = c.Int(),
                        RedeSocial_ID_RedeSocial = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Autor)
                .ForeignKey("dbo.Enderecoes", t => t.Endereco_ID_Endereco)
                .ForeignKey("dbo.Logins", t => t.Login_ID_Login)
                .ForeignKey("dbo.RedeSocials", t => t.RedeSocial_ID_RedeSocial)
                .Index(t => t.Endereco_ID_Endereco)
                .Index(t => t.Login_ID_Login)
                .Index(t => t.RedeSocial_ID_RedeSocial);
            
            CreateTable(
                "dbo.Livroes",
                c => new
                    {
                        ID_Livro = c.Int(nullable: false, identity: true),
                        Titulo = c.String(nullable: false, maxLength: 100),
                        Numero_Paginas = c.Int(nullable: false),
                        Categoria = c.String(nullable: false, maxLength: 20),
                        Descricao = c.String(nullable: false, maxLength: 50),
                        ISBN = c.String(nullable: false, maxLength: 20),
                        Ilustrador = c.String(nullable: false, maxLength: 50),
                        Imagem_URL = c.String(nullable: false),
                        Datapublicacao = c.DateTime(nullable: false),
                        Preco = c.Single(nullable: false),
                        Idioma = c.String(nullable: false, maxLength: 20),
                        Formato = c.String(nullable: false, maxLength: 20),
                        SubTitulo = c.String(nullable: false, maxLength: 50),
                        Sinopse = c.String(nullable: false),
                        Classificacao_Indicativa = c.String(nullable: false, maxLength: 10),
                        Carrinho_ID_Carrinho = c.Int(),
                        Classificao_ID_Classificacao = c.Int(),
                        Estoque_ID_Estoque = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Livro)
                .ForeignKey("dbo.Carrinhoes", t => t.Carrinho_ID_Carrinho)
                .ForeignKey("dbo.Classificaos", t => t.Classificao_ID_Classificacao)
                .ForeignKey("dbo.Estoques", t => t.Estoque_ID_Estoque)
                .Index(t => t.Carrinho_ID_Carrinho)
                .Index(t => t.Classificao_ID_Classificacao)
                .Index(t => t.Estoque_ID_Estoque);
            
            CreateTable(
                "dbo.Cupoms",
                c => new
                    {
                        ID_Cupom = c.Int(nullable: false, identity: true),
                        Desconto = c.Single(nullable: false),
                        Nome = c.String(nullable: false, maxLength: 50),
                        Data_Ini = c.DateTime(nullable: false),
                        Data_Fim = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Cupom);
            
            CreateTable(
                "dbo.Pessoas",
                c => new
                    {
                        ID_Pessoa = c.Int(nullable: false, identity: true),
                        CPF = c.String(nullable: false, maxLength: 15),
                        Nome = c.String(nullable: false, maxLength: 50),
                        Desconto = c.Boolean(nullable: false),
                        Tipo_pessoa = c.String(nullable: false, maxLength: 20),
                        sexo = c.String(nullable: false, maxLength: 1),
                        Data_Nascimento = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Pessoa);
            
            CreateTable(
                "dbo.Clientes",
                c => new
                    {
                        ID_Cliente = c.Int(nullable: false, identity: true),
                        Pessoa_ID_Pessoa = c.Int(),
                        Compra_ID_Compra = c.Int(),
                        Classificao_ID_Classificacao = c.Int(),
                        Endereco_ID_Endereco = c.Int(),
                        Livraria_ID_Livraria = c.Int(),
                        Login_ID_Login = c.Int(),
                        RedeSocial_ID_RedeSocial = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Cliente)
                .ForeignKey("dbo.Pessoas", t => t.Pessoa_ID_Pessoa)
                .ForeignKey("dbo.Compras", t => t.Compra_ID_Compra)
                .ForeignKey("dbo.Classificaos", t => t.Classificao_ID_Classificacao)
                .ForeignKey("dbo.Enderecoes", t => t.Endereco_ID_Endereco)
                .ForeignKey("dbo.Livrarias", t => t.Livraria_ID_Livraria)
                .ForeignKey("dbo.Logins", t => t.Login_ID_Login)
                .ForeignKey("dbo.RedeSocials", t => t.RedeSocial_ID_RedeSocial)
                .Index(t => t.Pessoa_ID_Pessoa)
                .Index(t => t.Compra_ID_Compra)
                .Index(t => t.Classificao_ID_Classificacao)
                .Index(t => t.Endereco_ID_Endereco)
                .Index(t => t.Livraria_ID_Livraria)
                .Index(t => t.Login_ID_Login)
                .Index(t => t.RedeSocial_ID_RedeSocial);
            
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
                        Descricao = c.String(nullable: false, maxLength: 50),
                        Compra_ID_Compra = c.Int(),
                    })
                .PrimaryKey(t => t.ID_Tipo)
                .ForeignKey("dbo.Compras", t => t.Compra_ID_Compra)
                .Index(t => t.Compra_ID_Compra);
            
            CreateTable(
                "dbo.Classificaos",
                c => new
                    {
                        ID_Classificacao = c.Int(nullable: false, identity: true),
                        Nota = c.Int(nullable: false),
                        Comentario = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID_Classificacao);
            
            CreateTable(
                "dbo.Enderecoes",
                c => new
                    {
                        ID_Endereco = c.Int(nullable: false, identity: true),
                        CEP = c.String(nullable: false, maxLength: 10),
                        Cidade = c.String(nullable: false, maxLength: 30),
                        Bairro = c.String(nullable: false, maxLength: 30),
                        Complemento = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID_Endereco);
            
            CreateTable(
                "dbo.Escolas",
                c => new
                    {
                        ID_Escola = c.Int(nullable: false, identity: true),
                        Nome_Instituicao = c.String(nullable: false, maxLength: 50),
                        Responsavel = c.String(nullable: false, maxLength: 20),
                        Livro_Adotado = c.String(nullable: false, maxLength: 100),
                        Serie_Adotada = c.String(nullable: false, maxLength: 50),
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
                        CNPJ = c.String(nullable: false, maxLength: 15),
                        Tipo_Consignacao = c.String(nullable: false, maxLength: 50),
                        Nome = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID_Livraria);
            
            CreateTable(
                "dbo.Logins",
                c => new
                    {
                        ID_Login = c.Int(nullable: false, identity: true),
                        Usuario = c.String(nullable: false, maxLength: 20),
                        Senha = c.String(nullable: false, maxLength: 24),
                    })
                .PrimaryKey(t => t.ID_Login);
            
            CreateTable(
                "dbo.RedeSocials",
                c => new
                    {
                        ID_RedeSocial = c.Int(nullable: false, identity: true),
                        email = c.String(maxLength: 20),
                        Instagram = c.String(maxLength: 20),
                        Twitter = c.String(maxLength: 20),
                        Facebook = c.String(maxLength: 20),
                    })
                .PrimaryKey(t => t.ID_RedeSocial);
            
            CreateTable(
                "dbo.Telefones",
                c => new
                    {
                        ID_Telefone = c.Int(nullable: false, identity: true),
                        Tipo_Telefone = c.String(nullable: false, maxLength: 15),
                        Numero = c.String(nullable: false, maxLength: 20),
                        id_autor_cliente = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Telefone);
            
            CreateTable(
                "dbo.CupomLivroes",
                c => new
                    {
                        Cupom_ID_Cupom = c.Int(nullable: false),
                        Livro_ID_Livro = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Cupom_ID_Cupom, t.Livro_ID_Livro })
                .ForeignKey("dbo.Cupoms", t => t.Cupom_ID_Cupom, cascadeDelete: true)
                .ForeignKey("dbo.Livroes", t => t.Livro_ID_Livro, cascadeDelete: true)
                .Index(t => t.Cupom_ID_Cupom)
                .Index(t => t.Livro_ID_Livro);
            
            CreateTable(
                "dbo.PessoaCupoms",
                c => new
                    {
                        Pessoa_ID_Pessoa = c.Int(nullable: false),
                        Cupom_ID_Cupom = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Pessoa_ID_Pessoa, t.Cupom_ID_Cupom })
                .ForeignKey("dbo.Pessoas", t => t.Pessoa_ID_Pessoa, cascadeDelete: true)
                .ForeignKey("dbo.Cupoms", t => t.Cupom_ID_Cupom, cascadeDelete: true)
                .Index(t => t.Pessoa_ID_Pessoa)
                .Index(t => t.Cupom_ID_Cupom);
            
            CreateTable(
                "dbo.LivroAutors",
                c => new
                    {
                        Livro_ID_Livro = c.Int(nullable: false),
                        Autor_ID_Autor = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Livro_ID_Livro, t.Autor_ID_Autor })
                .ForeignKey("dbo.Livroes", t => t.Livro_ID_Livro, cascadeDelete: true)
                .ForeignKey("dbo.Autors", t => t.Autor_ID_Autor, cascadeDelete: true)
                .Index(t => t.Livro_ID_Livro)
                .Index(t => t.Autor_ID_Autor);
            
            DropTable("dbo.Tests");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Tests",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.ID);
            
            DropForeignKey("dbo.Clientes", "RedeSocial_ID_RedeSocial", "dbo.RedeSocials");
            DropForeignKey("dbo.Autors", "RedeSocial_ID_RedeSocial", "dbo.RedeSocials");
            DropForeignKey("dbo.Clientes", "Login_ID_Login", "dbo.Logins");
            DropForeignKey("dbo.Autors", "Login_ID_Login", "dbo.Logins");
            DropForeignKey("dbo.Clientes", "Livraria_ID_Livraria", "dbo.Livrarias");
            DropForeignKey("dbo.Livroes", "Estoque_ID_Estoque", "dbo.Estoques");
            DropForeignKey("dbo.Clientes", "Endereco_ID_Endereco", "dbo.Enderecoes");
            DropForeignKey("dbo.Autors", "Endereco_ID_Endereco", "dbo.Enderecoes");
            DropForeignKey("dbo.Livroes", "Classificao_ID_Classificacao", "dbo.Classificaos");
            DropForeignKey("dbo.Clientes", "Classificao_ID_Classificacao", "dbo.Classificaos");
            DropForeignKey("dbo.Livroes", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropForeignKey("dbo.Compras", "Carrinho_ID_Carrinho", "dbo.Carrinhoes");
            DropForeignKey("dbo.Tipoes", "Compra_ID_Compra", "dbo.Compras");
            DropForeignKey("dbo.Clientes", "Compra_ID_Compra", "dbo.Compras");
            DropForeignKey("dbo.LivroAutors", "Autor_ID_Autor", "dbo.Autors");
            DropForeignKey("dbo.LivroAutors", "Livro_ID_Livro", "dbo.Livroes");
            DropForeignKey("dbo.Clientes", "Pessoa_ID_Pessoa", "dbo.Pessoas");
            DropForeignKey("dbo.PessoaCupoms", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropForeignKey("dbo.PessoaCupoms", "Pessoa_ID_Pessoa", "dbo.Pessoas");
            DropForeignKey("dbo.CupomLivroes", "Livro_ID_Livro", "dbo.Livroes");
            DropForeignKey("dbo.CupomLivroes", "Cupom_ID_Cupom", "dbo.Cupoms");
            DropIndex("dbo.LivroAutors", new[] { "Autor_ID_Autor" });
            DropIndex("dbo.LivroAutors", new[] { "Livro_ID_Livro" });
            DropIndex("dbo.PessoaCupoms", new[] { "Cupom_ID_Cupom" });
            DropIndex("dbo.PessoaCupoms", new[] { "Pessoa_ID_Pessoa" });
            DropIndex("dbo.CupomLivroes", new[] { "Livro_ID_Livro" });
            DropIndex("dbo.CupomLivroes", new[] { "Cupom_ID_Cupom" });
            DropIndex("dbo.Tipoes", new[] { "Compra_ID_Compra" });
            DropIndex("dbo.Compras", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.Clientes", new[] { "RedeSocial_ID_RedeSocial" });
            DropIndex("dbo.Clientes", new[] { "Login_ID_Login" });
            DropIndex("dbo.Clientes", new[] { "Livraria_ID_Livraria" });
            DropIndex("dbo.Clientes", new[] { "Endereco_ID_Endereco" });
            DropIndex("dbo.Clientes", new[] { "Classificao_ID_Classificacao" });
            DropIndex("dbo.Clientes", new[] { "Compra_ID_Compra" });
            DropIndex("dbo.Clientes", new[] { "Pessoa_ID_Pessoa" });
            DropIndex("dbo.Livroes", new[] { "Estoque_ID_Estoque" });
            DropIndex("dbo.Livroes", new[] { "Classificao_ID_Classificacao" });
            DropIndex("dbo.Livroes", new[] { "Carrinho_ID_Carrinho" });
            DropIndex("dbo.Autors", new[] { "RedeSocial_ID_RedeSocial" });
            DropIndex("dbo.Autors", new[] { "Login_ID_Login" });
            DropIndex("dbo.Autors", new[] { "Endereco_ID_Endereco" });
            DropTable("dbo.LivroAutors");
            DropTable("dbo.PessoaCupoms");
            DropTable("dbo.CupomLivroes");
            DropTable("dbo.Telefones");
            DropTable("dbo.RedeSocials");
            DropTable("dbo.Logins");
            DropTable("dbo.Livrarias");
            DropTable("dbo.Estoques");
            DropTable("dbo.Escolas");
            DropTable("dbo.Enderecoes");
            DropTable("dbo.Classificaos");
            DropTable("dbo.Tipoes");
            DropTable("dbo.Compras");
            DropTable("dbo.Carrinhoes");
            DropTable("dbo.Clientes");
            DropTable("dbo.Pessoas");
            DropTable("dbo.Cupoms");
            DropTable("dbo.Livroes");
            DropTable("dbo.Autors");
        }
    }
}
