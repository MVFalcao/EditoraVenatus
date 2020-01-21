namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Banco23 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(nullable: false, maxLength: 50));
            DropColumn("dbo.Cupoms", "Botao_URL");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Cupoms", "Botao_URL", c => c.String());
            AlterColumn("dbo.Livroes", "SubTitulo", c => c.String(maxLength: 50));
        }
    }
}
