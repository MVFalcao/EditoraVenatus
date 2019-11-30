namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco17 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Enderecoes", "Estado", c => c.String(nullable: false, maxLength: 30));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Enderecoes", "Estado");
        }
    }
}
