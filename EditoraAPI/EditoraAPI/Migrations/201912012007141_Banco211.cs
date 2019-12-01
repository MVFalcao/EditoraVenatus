namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Banco211 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Clientes", "Compra_ID_Compra", "dbo.Compras");
            DropForeignKey("dbo.Tipoes", "Compra_ID_Compra", "dbo.Compras");
            DropIndex("dbo.Clientes", new[] { "Compra_ID_Compra" });
            DropIndex("dbo.Tipoes", new[] { "Compra_ID_Compra" });
            AddColumn("dbo.Compras", "NomeCli", c => c.String(nullable: false));
            DropColumn("dbo.Clientes", "Compra_ID_Compra");
            DropColumn("dbo.Compras", "id_cliente");
            DropColumn("dbo.Compras", "id_tipo");
            DropColumn("dbo.Tipoes", "Compra_ID_Compra");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tipoes", "Compra_ID_Compra", c => c.Int());
            AddColumn("dbo.Compras", "id_tipo", c => c.Int(nullable: false));
            AddColumn("dbo.Compras", "id_cliente", c => c.Int(nullable: false));
            AddColumn("dbo.Clientes", "Compra_ID_Compra", c => c.Int());
            DropColumn("dbo.Compras", "NomeCli");
            CreateIndex("dbo.Tipoes", "Compra_ID_Compra");
            CreateIndex("dbo.Clientes", "Compra_ID_Compra");
            AddForeignKey("dbo.Tipoes", "Compra_ID_Compra", "dbo.Compras", "ID_Compra");
            AddForeignKey("dbo.Clientes", "Compra_ID_Compra", "dbo.Compras", "ID_Compra");
        }
    }
}
