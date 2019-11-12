namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco8 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pessoas", "Sobrenome", c => c.String(nullable: false, maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Pessoas", "Sobrenome");
        }
    }
}
