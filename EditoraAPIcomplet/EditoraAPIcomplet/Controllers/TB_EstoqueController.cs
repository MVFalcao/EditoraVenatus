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
using EditoraAPIcomplet.Models;

namespace EditoraAPIcomplet.Controllers
{
    public class TB_EstoqueController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Estoque
        public IQueryable<TB_Estoque> GetTB_Estoque()
        {
            return db.TB_Estoque;
        }

        // GET: api/TB_Estoque/5
        [ResponseType(typeof(TB_Estoque))]
        public IHttpActionResult GetTB_Estoque(int id)
        {
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            if (tB_Estoque == null)
            {
                return NotFound();
            }

            return Ok(tB_Estoque);
        }

        // PUT: api/TB_Estoque/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Estoque(int id, TB_Estoque tB_Estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Estoque.ID_Estoque)
            {
                return BadRequest();
            }

            db.Entry(tB_Estoque).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_EstoqueExists(id))
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

        // POST: api/TB_Estoque
        [ResponseType(typeof(TB_Estoque))]
        public IHttpActionResult PostTB_Estoque(TB_Estoque tB_Estoque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Estoque.Add(tB_Estoque);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_EstoqueExists(tB_Estoque.ID_Estoque))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Estoque.ID_Estoque }, tB_Estoque);
        }

        // DELETE: api/TB_Estoque/5
        [ResponseType(typeof(TB_Estoque))]
        public IHttpActionResult DeleteTB_Estoque(int id)
        {
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            if (tB_Estoque == null)
            {
                return NotFound();
            }

            db.TB_Estoque.Remove(tB_Estoque);
            db.SaveChanges();

            return Ok(tB_Estoque);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_EstoqueExists(int id)
        {
            return db.TB_Estoque.Count(e => e.ID_Estoque == id) > 0;
        }
    }
}