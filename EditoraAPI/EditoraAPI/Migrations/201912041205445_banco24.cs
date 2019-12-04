namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco24 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cupoms", "Botao_URL", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cupoms", "Botao_URL");
        }
    }
}
