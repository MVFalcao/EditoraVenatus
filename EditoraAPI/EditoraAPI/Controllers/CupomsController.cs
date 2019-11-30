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
using EditoraAPI.Tokens;

namespace EditoraAPI.Controllers
{
    public class CupomsController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Cupoms
        public IQueryable<Cupom> Getcupoms()
        {
            return db.cupoms;
        }
        [ResponseType(typeof(Cupom))]
        [Route("api/ValidateCupom/")]
        public IHttpActionResult ValidateCupom(string senha)
        {
            try
            {
                var cup = from c in db.cupoms where c.Nome == senha select c.ID_Cupom;
                if (cup == null)
                {
                    return NotFound();
                }
                return Ok(cup);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        // GET: api/Cupoms/5
        [ResponseType(typeof(Cupom))]
        public IHttpActionResult GetCupom(int id)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            Cupom cupom = db.cupoms.Find(id);
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
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
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
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.cupoms.Add(cupom);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cupom.ID_Cupom }, cupom);
        }

        // DELETE: api/Cupoms/5
        [ResponseType(typeof(Cupom))]
        public IHttpActionResult DeleteCupom(int id)
        {
            Cupom cupom = db.cupoms.Find(id);
            if (cupom == null)
            {
                return NotFound();
            }

            db.cupoms.Remove(cupom);
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
            return db.cupoms.Count(e => e.ID_Cupom == id) > 0;
        }
    }
}