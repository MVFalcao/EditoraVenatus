namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco12 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Enderecoes", "Nome_Proprietário", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Enderecoes", "Nome_Proprietário");
        }
    }
}
