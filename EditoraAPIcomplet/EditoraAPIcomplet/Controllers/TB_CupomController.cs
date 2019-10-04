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
    public class TB_CupomController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Cupom
        public IQueryable<TB_Cupom> GetTB_Cupom()
        {
            return db.TB_Cupom;
        }

        // GET: api/TB_Cupom/5
        [ResponseType(typeof(TB_Cupom))]
        public IHttpActionResult GetTB_Cupom(int id)
        {
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            if (tB_Cupom == null)
            {
                return NotFound();
            }

            return Ok(tB_Cupom);
        }

        // PUT: api/TB_Cupom/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Cupom(int id, TB_Cupom tB_Cupom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Cupom.ID_Cupom)
            {
                return BadRequest();
            }

            db.Entry(tB_Cupom).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_CupomExists(id))
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

        // POST: api/TB_Cupom
        [ResponseType(typeof(TB_Cupom))]
        public IHttpActionResult PostTB_Cupom(TB_Cupom tB_Cupom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Cupom.Add(tB_Cupom);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_CupomExists(tB_Cupom.ID_Cupom))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Cupom.ID_Cupom }, tB_Cupom);
        }

        // DELETE: api/TB_Cupom/5
        [ResponseType(typeof(TB_Cupom))]
        public IHttpActionResult DeleteTB_Cupom(int id)
        {
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            if (tB_Cupom == null)
            {
                return NotFound();
            }

            db.TB_Cupom.Remove(tB_Cupom);
            db.SaveChanges();

            return Ok(tB_Cupom);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_CupomExists(int id)
        {
            return db.TB_Cupom.Count(e => e.ID_Cupom == id) > 0;
        }
    }
}