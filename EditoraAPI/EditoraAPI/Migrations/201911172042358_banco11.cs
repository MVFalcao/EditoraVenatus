namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco11 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Eventoes", "Escola", c => c.Int(nullable: false));
            AlterColumn("dbo.Livroes", "Imagem_URL", c => c.String());
            DropColumn("dbo.Eventoes", "Esc");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Eventoes", "Esc", c => c.Int(nullable: false));
            AlterColumn("dbo.Livroes", "Imagem_URL", c => c.String(nullable: false));
            DropColumn("dbo.Eventoes", "Escola");
        }
    }
}
