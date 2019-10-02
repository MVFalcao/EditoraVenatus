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
    public class TB_EscolaController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Escola
        public IQueryable<TB_Escola> GetTB_Escola()
        {
            return db.TB_Escola;
        }

        // GET: api/TB_Escola/5
        [ResponseType(typeof(TB_Escola))]
        public IHttpActionResult GetTB_Escola(int id)
        {
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            if (tB_Escola == null)
            {
                return NotFound();
            }

            return Ok(tB_Escola);
        }

        // PUT: api/TB_Escola/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Escola(int id, TB_Escola tB_Escola)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Escola.ID_Escola)
            {
                return BadRequest();
            }

            db.Entry(tB_Escola).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_EscolaExists(id))
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

        // POST: api/TB_Escola
        [ResponseType(typeof(TB_Escola))]
        public IHttpActionResult PostTB_Escola(TB_Escola tB_Escola)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Escola.Add(tB_Escola);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_EscolaExists(tB_Escola.ID_Escola))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Escola.ID_Escola }, tB_Escola);
        }

        // DELETE: api/TB_Escola/5
        [ResponseType(typeof(TB_Escola))]
        public IHttpActionResult DeleteTB_Escola(int id)
        {
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            if (tB_Escola == null)
            {
                return NotFound();
            }

            db.TB_Escola.Remove(tB_Escola);
            db.SaveChanges();

            return Ok(tB_Escola);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_EscolaExists(int id)
        {
            return db.TB_Escola.Count(e => e.ID_Escola == id) > 0;
        }
    }
}