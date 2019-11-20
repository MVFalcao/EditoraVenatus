namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco14 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Enderecoes", "Logradouro", c => c.String(nullable: false));
            AddColumn("dbo.Enderecoes", "Numero", c => c.String(nullable: false, maxLength: 10));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Enderecoes", "Numero");
            DropColumn("dbo.Enderecoes", "Logradouro");
        }
    }
}
