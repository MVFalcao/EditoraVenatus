namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco9 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Livroes", "Imagem_URL", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Livroes", "Imagem_URL", c => c.String(nullable: false));
        }
    }
}
