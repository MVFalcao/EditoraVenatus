using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EditoraAPI.Models;

namespace EditoraAPI.Controllers
{
    public class ComprasController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Compras
        public IQueryable<Compra> GetCompras()
        {
            return db.Compras;
        }

        // GET: api/Compras/5
        [ResponseType(typeof(Compra))]
        public IHttpActionResult GetCompra(int id)
        {
            Compra compra = db.Compras.Find(id);
            if (compra == null)
            {
                return NotFound();
            }

            return Ok(compra);
        }

        // PUT: api/Compras/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompra(int id, Compra compra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != compra.ID_Compra)
            {
                return BadRequest();
            }

            db.Entry(compra).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Compras
        [ResponseType(typeof(Compra))]
        public IHttpActionResult PostCompra(Compra compra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Compras.Add(compra);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = compra.ID_Compra }, compra);
        }

        // DELETE: api/Compras/5
        [ResponseType(typeof(Compra))]
        public IHttpActionResult DeleteCompra(int id)
        {
            Compra compra = db.Compras.Find(id);
            if (compra == null)
            {
                return NotFound();
            }

            db.Compras.Remove(compra);
            db.SaveChanges();

            return Ok(compra);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompraExists(int id)
        {
            return db.Compras.Count(e => e.ID_Compra == id) > 0;
        }
    }
}