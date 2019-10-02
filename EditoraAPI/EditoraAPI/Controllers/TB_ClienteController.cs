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
    public class TB_ClienteController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Cliente
        public IQueryable<TB_Cliente> GetTB_Cliente()
        {
            return db.TB_Cliente;
        }

        // GET: api/TB_Cliente/5
        [ResponseType(typeof(TB_Cliente))]
        public IHttpActionResult GetTB_Cliente(int id)
        {
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            if (tB_Cliente == null)
            {
                return NotFound();
            }

            return Ok(tB_Cliente);
        }

        // PUT: api/TB_Cliente/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Cliente(int id, TB_Cliente tB_Cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Cliente.ID_Cliente)
            {
                return BadRequest();
            }

            db.Entry(tB_Cliente).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_ClienteExists(id))
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

        // POST: api/TB_Cliente
        [ResponseType(typeof(TB_Cliente))]
        public IHttpActionResult PostTB_Cliente(TB_Cliente tB_Cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Cliente.Add(tB_Cliente);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_ClienteExists(tB_Cliente.ID_Cliente))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Cliente.ID_Cliente }, tB_Cliente);
        }

        // DELETE: api/TB_Cliente/5
        [ResponseType(typeof(TB_Cliente))]
        public IHttpActionResult DeleteTB_Cliente(int id)
        {
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            if (tB_Cliente == null)
            {
                return NotFound();
            }

            db.TB_Cliente.Remove(tB_Cliente);
            db.SaveChanges();

            return Ok(tB_Cliente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_ClienteExists(int id)
        {
            return db.TB_Cliente.Count(e => e.ID_Cliente == id) > 0;
        }
    }
}