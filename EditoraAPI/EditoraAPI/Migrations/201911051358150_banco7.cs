namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco7 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Logins",
                c => new
                    {
                        ID_Login = c.Int(nullable: false, identity: true),
                        autor = c.Int(nullable: false),
                        cliente = c.Int(nullable: false),
                        Usuario = c.String(nullable: false, maxLength: 20),
                        Senha = c.String(nullable: false, maxLength: 24),
                    })
                .PrimaryKey(t => t.ID_Login);
            
            AddColumn("dbo.Autors", "Login_ID_Login", c => c.Int());
            AddColumn("dbo.Clientes", "Login_ID_Login", c => c.Int());
            CreateIndex("dbo.Autors", "Login_ID_Login");
            CreateIndex("dbo.Clientes", "Login_ID_Login");
            AddForeignKey("dbo.Autors", "Login_ID_Login", "dbo.Logins", "ID_Login");
            AddForeignKey("dbo.Clientes", "Login_ID_Login", "dbo.Logins", "ID_Login");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Clientes", "Login_ID_Login", "dbo.Logins");
            DropForeignKey("dbo.Autors", "Login_ID_Login", "dbo.Logins");
            DropIndex("dbo.Clientes", new[] { "Login_ID_Login" });
            DropIndex("dbo.Autors", new[] { "Login_ID_Login" });
            DropColumn("dbo.Clientes", "Login_ID_Login");
            DropColumn("dbo.Autors", "Login_ID_Login");
            DropTable("dbo.Logins");
        }
    }
}
