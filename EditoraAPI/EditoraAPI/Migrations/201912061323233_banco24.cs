namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco24 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RegistroControleMercadorias",
                c => new
                    {
                        ID_RegConMerc = c.Int(nullable: false, identity: true),
                        Livro = c.Int(nullable: false),
                        Quantidade = c.Int(nullable: false),
                        Tipo = c.Int(nullable: false),
                        DataReg = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID_RegConMerc);
            
            AddColumn("dbo.Livroes", "RegistroControleMercadoria_ID_RegConMerc", c => c.Int());
            CreateIndex("dbo.Livroes", "RegistroControleMercadoria_ID_RegConMerc");
            AddForeignKey("dbo.Livroes", "RegistroControleMercadoria_ID_RegConMerc", "dbo.RegistroControleMercadorias", "ID_RegConMerc");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Livroes", "RegistroControleMercadoria_ID_RegConMerc", "dbo.RegistroControleMercadorias");
            DropIndex("dbo.Livroes", new[] { "RegistroControleMercadoria_ID_RegConMerc" });
            DropColumn("dbo.Livroes", "RegistroControleMercadoria_ID_RegConMerc");
            DropTable("dbo.RegistroControleMercadorias");
        }
    }
}
