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
    public class EstoquesController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Estoques
        public IQueryable<Estoque> GetEstoques()
        {
            return db.Estoques;
        }

        // GET: api/Estoques/5
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult GetEstoque(int id)
        {
            Estoque estoque = db.Estoques.Find(id);
            if (estoque == null)
            {
                return NotFound();
            }

            return Ok(estoque);
        }

        // PUT: api/Estoques/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstoque(int id, Estoque estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estoque.ID_Estoque)
            {
                return BadRequest();
            }

            db.Entry(estoque).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstoqueExists(id))
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

        // POST: api/Estoques
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult PostEstoque(Estoque estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Estoques.Add(estoque);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = estoque.ID_Estoque }, estoque);
        }

        // DELETE: api/Estoques/5
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult DeleteEstoque(int id)
        {
            Estoque estoque = db.Estoques.Find(id);
            if (estoque == null)
            {
                return NotFound();
            }

            db.Estoques.Remove(estoque);
            db.SaveChanges();

            return Ok(estoque);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstoqueExists(int id)
        {
            return db.Estoques.Count(e => e.ID_Estoque == id) > 0;
        }
    }
}