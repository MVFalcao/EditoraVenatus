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
    public class TB_CompraController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Compra
        public IQueryable<TB_Compra> GetTB_Compra()
        {
            return db.TB_Compra;
        }

        // GET: api/TB_Compra/5
        [ResponseType(typeof(TB_Compra))]
        public IHttpActionResult GetTB_Compra(int id)
        {
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            if (tB_Compra == null)
            {
                return NotFound();
            }

            return Ok(tB_Compra);
        }

        // PUT: api/TB_Compra/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Compra(int id, TB_Compra tB_Compra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Compra.ID_Compra)
            {
                return BadRequest();
            }

            db.Entry(tB_Compra).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_CompraExists(id))
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

        // POST: api/TB_Compra
        [ResponseType(typeof(TB_Compra))]
        public IHttpActionResult PostTB_Compra(TB_Compra tB_Compra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Compra.Add(tB_Compra);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_CompraExists(tB_Compra.ID_Compra))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Compra.ID_Compra }, tB_Compra);
        }

        // DELETE: api/TB_Compra/5
        [ResponseType(typeof(TB_Compra))]
        public IHttpActionResult DeleteTB_Compra(int id)
        {
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            if (tB_Compra == null)
            {
                return NotFound();
            }

            db.TB_Compra.Remove(tB_Compra);
            db.SaveChanges();

            return Ok(tB_Compra);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_CompraExists(int id)
        {
            return db.TB_Compra.Count(e => e.ID_Compra == id) > 0;
        }
    }
}