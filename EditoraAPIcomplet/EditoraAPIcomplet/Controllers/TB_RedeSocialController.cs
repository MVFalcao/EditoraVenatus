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
    public class TB_RedeSocialController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_RedeSocial
        public IQueryable<TB_RedeSocial> GetTB_RedeSocial()
        {
            return db.TB_RedeSocial;
        }

        // GET: api/TB_RedeSocial/5
        [ResponseType(typeof(TB_RedeSocial))]
        public IHttpActionResult GetTB_RedeSocial(int id)
        {
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            if (tB_RedeSocial == null)
            {
                return NotFound();
            }

            return Ok(tB_RedeSocial);
        }

        // PUT: api/TB_RedeSocial/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_RedeSocial(int id, TB_RedeSocial tB_RedeSocial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_RedeSocial.ID_RedeSocial)
            {
                return BadRequest();
            }

            db.Entry(tB_RedeSocial).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_RedeSocialExists(id))
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

        // POST: api/TB_RedeSocial
        [ResponseType(typeof(TB_RedeSocial))]
        public IHttpActionResult PostTB_RedeSocial(TB_RedeSocial tB_RedeSocial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_RedeSocial.Add(tB_RedeSocial);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_RedeSocialExists(tB_RedeSocial.ID_RedeSocial))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_RedeSocial.ID_RedeSocial }, tB_RedeSocial);
        }

        // DELETE: api/TB_RedeSocial/5
        [ResponseType(typeof(TB_RedeSocial))]
        public IHttpActionResult DeleteTB_RedeSocial(int id)
        {
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            if (tB_RedeSocial == null)
            {
                return NotFound();
            }

            db.TB_RedeSocial.Remove(tB_RedeSocial);
            db.SaveChanges();

            return Ok(tB_RedeSocial);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_RedeSocialExists(int id)
        {
            return db.TB_RedeSocial.Count(e => e.ID_RedeSocial == id) > 0;
        }
    }
}