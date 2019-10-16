namespace EditoraAPI.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EditoraAPI.Models.BancoEditora>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "EditoraAPI.Models.BancoEditora";
        }

        protected override void Seed(EditoraAPI.Models.BancoEditora context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
