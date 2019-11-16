namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco9 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Eventoes",
                c => new
                    {
                        ID_Evento = c.Int(nullable: false, identity: true),
                        Imagem_URL = c.String(nullable: false),
                        Titulo = c.String(nullable: false),
                        Descrição = c.String(nullable: false),
                        Data_Evento = c.DateTime(nullable: false),
                        Esc = c.Int(nullable: false),
                        Livraria = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID_Evento);
            
            AddColumn("dbo.Escolas", "Evento_ID_Evento", c => c.Int());
            AddColumn("dbo.Livrarias", "Evento_ID_Evento", c => c.Int());
            CreateIndex("dbo.Escolas", "Evento_ID_Evento");
            CreateIndex("dbo.Livrarias", "Evento_ID_Evento");
            AddForeignKey("dbo.Escolas", "Evento_ID_Evento", "dbo.Eventoes", "ID_Evento");
            AddForeignKey("dbo.Livrarias", "Evento_ID_Evento", "dbo.Eventoes", "ID_Evento");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Livrarias", "Evento_ID_Evento", "dbo.Eventoes");
            DropForeignKey("dbo.Escolas", "Evento_ID_Evento", "dbo.Eventoes");
            DropIndex("dbo.Livrarias", new[] { "Evento_ID_Evento" });
            DropIndex("dbo.Escolas", new[] { "Evento_ID_Evento" });
            DropColumn("dbo.Livrarias", "Evento_ID_Evento");
            DropColumn("dbo.Escolas", "Evento_ID_Evento");
            DropTable("dbo.Eventoes");
        }
    }
}
