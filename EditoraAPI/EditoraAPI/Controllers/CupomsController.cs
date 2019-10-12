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
    public class CupomsController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Cupoms
        public IQueryable<Cupom> GetCupoms()
        {
            return db.Cupoms;
        }

        // GET: api/Cupoms/5
        [ResponseType(typeof(Cupom))]
        public IHttpActionResult GetCupom(int id)
        {
            Cupom cupom = db.Cupoms.Find(id);
            if (cupom == null)
            {
                return NotFound();
            }

            return Ok(cupom);
        }

        // PUT: api/Cupoms/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCupom(int id, Cupom cupom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cupom.ID_Cupom)
            {
                return BadRequest();
            }

            db.Entry(cupom).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CupomExists(id))
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

        // POST: api/Cupoms
        [ResponseType(typeof(Cupom))]
        public IHttpActionResult PostCupom(Cupom cupom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cupoms.Add(cupom);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cupom.ID_Cupom }, cupom);
        }

        // DELETE: api/Cupoms/5
        [ResponseType(typeof(Cupom))]
        public IHttpActionResult DeleteCupom(int id)
        {
            Cupom cupom = db.Cupoms.Find(id);
            if (cupom == null)
            {
                return NotFound();
            }

            db.Cupoms.Remove(cupom);
            db.SaveChanges();

            return Ok(cupom);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CupomExists(int id)
        {
            return db.Cupoms.Count(e => e.ID_Cupom == id) > 0;
        }
    }
}