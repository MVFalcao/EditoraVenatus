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
    public class TB_TelefoneController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Telefone
        public IQueryable<TB_Telefone> GetTB_Telefone()
        {
            return db.TB_Telefone;
        }

        // GET: api/TB_Telefone/5
        [ResponseType(typeof(TB_Telefone))]
        public IHttpActionResult GetTB_Telefone(int id)
        {
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            if (tB_Telefone == null)
            {
                return NotFound();
            }

            return Ok(tB_Telefone);
        }

        // PUT: api/TB_Telefone/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Telefone(int id, TB_Telefone tB_Telefone)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Telefone.ID_Telefone)
            {
                return BadRequest();
            }

            db.Entry(tB_Telefone).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_TelefoneExists(id))
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

        // POST: api/TB_Telefone
        [ResponseType(typeof(TB_Telefone))]
        public IHttpActionResult PostTB_Telefone(TB_Telefone tB_Telefone)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Telefone.Add(tB_Telefone);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_TelefoneExists(tB_Telefone.ID_Telefone))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Telefone.ID_Telefone }, tB_Telefone);
        }

        // DELETE: api/TB_Telefone/5
        [ResponseType(typeof(TB_Telefone))]
        public IHttpActionResult DeleteTB_Telefone(int id)
        {
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            if (tB_Telefone == null)
            {
                return NotFound();
            }

            db.TB_Telefone.Remove(tB_Telefone);
            db.SaveChanges();

            return Ok(tB_Telefone);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_TelefoneExists(int id)
        {
            return db.TB_Telefone.Count(e => e.ID_Telefone == id) > 0;
        }
    }
}