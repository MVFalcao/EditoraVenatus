namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco13 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Enderecoes", "Nome_Proprietario", c => c.String());
            DropColumn("dbo.Enderecoes", "Nome_Proprietário");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Enderecoes", "Nome_Proprietário", c => c.String());
            DropColumn("dbo.Enderecoes", "Nome_Proprietario");
        }
    }
}
