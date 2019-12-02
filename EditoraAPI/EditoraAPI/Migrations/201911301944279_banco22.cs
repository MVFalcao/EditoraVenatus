namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco22 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cupoms", "Botao_URL", c => c.String());
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(nullable: false, maxLength: 50));
            DropColumn("dbo.Cupoms", "Botao_URL");
        }
    }
}
