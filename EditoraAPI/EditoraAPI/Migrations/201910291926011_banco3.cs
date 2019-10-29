namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class banco3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Telefones", "Id_a", c => c.Int(nullable: false));
            AddColumn("dbo.Telefones", "Id_c", c => c.Int(nullable: false));
            DropColumn("dbo.Telefones", "Id_autor");
            DropColumn("dbo.Telefones", "Id_cliente");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Telefones", "Id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Telefones", "Id_autor", c => c.Int(nullable: false));
            DropColumn("dbo.Telefones", "Id_c");
            DropColumn("dbo.Telefones", "Id_a");
        }
    }
}
