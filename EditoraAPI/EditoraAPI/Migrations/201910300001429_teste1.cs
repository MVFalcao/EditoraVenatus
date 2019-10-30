namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class teste1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RedeSocials", "email", c => c.String());
            AlterColumn("dbo.RedeSocials", "Instagram", c => c.String());
            AlterColumn("dbo.RedeSocials", "Twitter", c => c.String());
            AlterColumn("dbo.RedeSocials", "Facebook", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RedeSocials", "Facebook", c => c.String(maxLength: 20));
            AlterColumn("dbo.RedeSocials", "Twitter", c => c.String(maxLength: 20));
            AlterColumn("dbo.RedeSocials", "Instagram", c => c.String(maxLength: 20));
            AlterColumn("dbo.RedeSocials", "email", c => c.String(maxLength: 20));
        }
    }
}
