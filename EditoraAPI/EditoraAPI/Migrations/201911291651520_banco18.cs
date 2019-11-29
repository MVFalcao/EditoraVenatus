namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco18 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Livroes", "Botao_URL", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Livroes", "Botao_URL");
        }
    }
}
